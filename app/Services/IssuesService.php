<?php

namespace App\Services;

use App\Models\Issue;
use App\Models\IssueStatuse;
use App\Models\Journal;
use App\Models\Project;
use App\Models\Tracker;
use Illuminate\Support\Facades\Auth;

/**
 * Class IssuesService
 *
 * JournalsService $journalsService
 * JournalDetailsService $journalDetailsService
 *
 * @package App\Services
 */
class IssuesService
{
    protected $journalsService;
    protected $journalDetailsService;

    public function __construct(JournalsService $journalsService, JournalDetailsService $journalDetailsService)
    {
        $this->journalsService = $journalsService;
        $this->journalDetailsService = $journalDetailsService;
    }

    public function one($id)
    {
        return Issue::where('id', $id)->with(['trackers', 'user', 'author', 'project'])->first();
    }

    public function update($id, array $data)
    {
        if ($issue = Issue::where('id', $id)->firstOrFail()) {
            /**
             * @var Journal $journal
             */
            $journal = $this->journalsService->create([
                'notes' => isset($data['notes']) ? $data['notes'] : null,
                'journalized_type' => 'Issue',
                'journalized_id' => $issue->id,
                'user_id' => Auth::user()->id,
                'created_on' => date('Y-m-d H:i:s')
            ]);
            unset($data['notes']);

            $fields = [
                'tracker_id',
                'project_id',
                'status_id',
                'assigned_to_id',
                'done_ratio',
                'project_id',
                'priority_id',
                'priority_id',
                'subject',
                'estimated_hours',
                'description',
                'due_date',
                'is_private',
                'parent_id',
                'start_date'
            ];

            foreach ($fields as $field) {
                if (isset($data[$field]) && $issue[$field] != $data[$field]) {
                    $this->journalDetailsService->create([
                        'journal_id' => $journal->id,
                        'property' => 'attr',
                        'prop_key' => $field,
                        'old_value' => $issue[$field],
                        'value' => $data[$field]
                    ]);
                }
            }

            $issue->update($data);
            return $issue;
        }

        return false;
    }

    public function create($data)
    {
        $issue = Issue::create($data);
        return $issue;
    }

    public function all()
    {
        return Issue::limit(20)
            ->with(['trackers', 'user', 'author', 'project'])
            ->get();
    }

    public function list(string $id, $params = [])
    {
        $offset = array_get($params, 'offset', 0);

        $query = Issue::join(Project::getTableName(), Issue::getTableName() . '.project_id', '=', Project::getTableName() . '.id')
            ->select(Issue::getTableName() . '.*', Project::getTableName() . '.identifier')
            ->where(Project::getTableName() . '.identifier', $id)
            ->with(['trackers', 'user', 'author', 'project']);

        if ($statuses = array_get($params, 'status_ids', [])) {
            $query = $query->whereIn('status_id', $statuses);
        }

        if ($trackers = array_get($params, 'tracker_ids', [])) {
            $query = $query->whereIn('tracker_id', $trackers);
        }

        if ($priorities = array_get($params, 'priority_ids', [])) {
            $query = $query->whereIn('priority_id', $priorities);
        }

        $limit = array_get($params, 'limit');

        $result = [
            'count' => $query->count(),
            'issues' => $query->offset($offset)->limit($limit)->get()

        ];

        return $result;
    }

    public function trackersCount($identifier)
    {
        $issues = Issue::join(Project::getTableName(), Issue::getTableName() . '.project_id', '=', Project::getTableName() . '.id')
            ->join(Tracker::getTableName(), Issue::getTableName() . '.tracker_id', '=', Tracker::getTableName() . '.id')
            ->join(IssueStatuse::getTableName(), Issue::getTableName() . '.status_id', '=', IssueStatuse::getTableName() . '.id')
            ->select(
                Tracker::getTableName() . '.name',
                IssueStatuse::getTableName() . '.is_closed'
            )
            ->where(Project::getTableName() . '.identifier', $identifier)
            ->orderBy('tracker_id', 'is_closed')
            ->get()
            ->toArray();

        $result = [];
        foreach ($issues as $issue) {
            if ($issue['is_closed']) {
                isset($result[$issue['name']]['closed']) ? $result[$issue['name']]['closed']++ : $result[$issue['name']]['closed'] = 1;
            } else {
                isset($result[$issue['name']]['opened']) ? $result[$issue['name']]['opened']++ : $result[$issue['name']]['opened'] = 1;
            }

        }

        return ['trackers' => $result];
    }

    public function deleteById($id)
    {
        return Issue::find($id)->delete();
    }


//	public function getInfoFroEdit($project_if)
//	{
//		$projects = Project::select('name', 'id')->get()->toArray();
//		$user_ids = Issue::where('project_id', $project_if)->select('assigned_to_id', 'author_id')->get()->toArray();
//		$users = User::whereIn('id', $user_ids)->get()->toArray();
//		return ['projects' => $projects, 'users' => $users];
//	}
}