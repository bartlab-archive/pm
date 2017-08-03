<?php

namespace App\Services;

use App\Models\Issue;
use App\Models\Project;

class IssuesService
{

    public function one($id)
    {
        return Issue::where('id', $id)
            ->with(['trackers', 'user', 'author', 'project'])->first(); // add project info
    }

    public function update($id, array $data)
    {
        if ($issue = Issue::where('id', $id)->firstOrFail()) {
            $issue->update($data);
            return true;
        }

        return false;
    }

    public function all()
    {
        return Issue::limit(20)
            ->with(['trackers', 'user', 'author', 'project'])
            ->get();
    }

    public function getIssuesByProjectIdentifier(string $id, $params = [])
    {
        $offset = array_get($params, 'offset', 0);

        $query = Issue::join(Project::getTableName(), Issue::getTableName() . '.project_id', '=', Project::getTableName() . '.id')
            ->select(Issue::getTableName() . '.*', Project::getTableName() . '.identifier')
            ->where(Project::getTableName() . '.identifier', $id)
            ->with(['trackers', 'user', 'author', 'project']);

        If (count(array_get($params, 'status_ids', []))) {
            $query = $query->whereIn('status_id', $params['status_ids']);
        }

        If (count(array_get($params, 'tracker_ids', []))) {
            $query = $query->whereIn('tracker_id', $params['tracker_ids']);
        }

        $result = [
            'count' => $query->count(),
            'issues' => $query->offset($offset)->limit(20)->get()

        ];

        return $result;
    }

    public function getCount(string $id)
    {
        return Issue::join(Project::getTableName(), Issue::getTableName() . '.project_id', '=', Project::getTableName() . '.id')
            ->select(Issue::getTableName() . '.*', Project::getTableName() . '.identifier')
            ->where(Project::getTableName() . '.identifier', $id)->count();
    }


//	public function getInfoFroEdit($project_if)
//	{
//		$projects = Project::select('name', 'id')->get()->toArray();
//		$user_ids = Issue::where('project_id', $project_if)->select('assigned_to_id', 'author_id')->get()->toArray();
//		$users = User::whereIn('id', $user_ids)->get()->toArray();
//		return ['projects' => $projects, 'users' => $users];
//	}
}