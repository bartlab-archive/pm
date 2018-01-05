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
 * @property JournalsService $journalsService
 * @property JournalDetailsService $journalDetailsService
 * @property WatchersService $watchersService
 * @property ProjectsService $projectsService
 *
 * @package App\Services
 */
class IssuesService
{
    protected $journalsService;
    protected $journalDetailsService;
    protected $watchersService;
    protected $projectsService;

    public function __construct(
        JournalsService $journalsService,
        JournalDetailsService $journalDetailsService,
        WatchersService $watchersService,
        ProjectsService $projectsService
    )
    {
        $this->projectsService = $projectsService;
        $this->journalsService = $journalsService;
        $this->journalDetailsService = $journalDetailsService;
        $this->watchersService = $watchersService;
    }

    public function one($id)
    {
        return Issue::where('id', $id)->with(['trackers', 'user', 'author', 'project', 'childIssues'])->first();
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

    public function all(array $params = [], array $orderBy = ['updated_on' => 'desc'])
    {
        $query = Issue::with(['tracker', 'project.trackers', 'user', 'author', 'project', 'status', 'watchers.user', 'priority']);

        if ($project = array_get($params, 'project_identifier')) {
            $query->whereHas('project', function ($query) use ($project) {
                $query->where('identifier', $project);
            });
        }

        if ($statuses = array_get($params, 'status_ids', [])) {
            $query->whereIn('status_id', (array)$statuses);
        }

        if ($trackers = array_get($params, 'tracker_ids', [])) {
            $query->whereIn('tracker_id', (array)$trackers);
        }

        if ($assigned_to_id = array_get($params, 'assigned_to_ids', [])) {
            $query = $query->whereIn('assigned_to_ids', $assigned_to_id);
        }

        if ($author_id = array_get($params, 'author_ids', [])) {
            $query = $query->whereIn('author_ids', $author_id);
        }

        if ($priorities = array_get($params, 'priority_ids', [])) {
            $query->whereIn('priority_id', (array)$priorities);
        }

        if (!empty([$orderBy])) {
            foreach ($orderBy as $key => $val) {
                $query->orderBy($key, $val);
            }
        }

        $total = $query->count();
        $limit = array_get($params, 'limit', 20);
        $offset = array_get($params, 'offset', 0);

        if ($offset > 0 && $offset >= $total) {
            $offset = $offset - $limit;
        }

        return [
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'issues' => $query->offset($offset)->limit($limit)->get()
        ];
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

    /**
     * @param array|int $ids
     * @return int
     */
    public function delete($ids)
    {
        return Issue::destroy($ids);
    }
}