<?php

namespace App\Services;

use App\Models\Issue;
use App\Models\IssueStatuse;
use App\Models\Project;
use App\Models\Tracker;


class IssuesService
{

    public function one($id)
    {
        return Issue::where('id', $id)->with(['trackers', 'user', 'author', 'project'])->first();
    }

    public function update($id, array $data)
    {
        if ($issue = Issue::where('id', $id)->firstOrFail()) {
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

        $result = [
            'count' => $query->count(),
            'issues' => $query->offset($offset)->limit(20)->get()

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