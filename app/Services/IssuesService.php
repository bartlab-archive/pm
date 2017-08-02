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

    public function all(string $id, $params = [])
    {
        $query = Issue::join(Project::getTableName(), Issue::getTableName() . '.project_id', '=', Project::getTableName() . '.id')
            ->select(Issue::getTableName() . '.*', Project::getTableName() . '.identifier')
            ->where(Project::getTableName() . '.identifier', $id)
            ->with(['trackers', 'user', 'author', 'project'])
            ->limit(20);

        If (isset($params['status_ids']) && count($params['status_ids'])) {
            $query = $query->whereIn('status_id', $params['status_ids']);
        }

        If (isset($params['tracker_ids']) && count($params['tracker_ids'])) {
            $query = $query->whereIn('tracker_id', $params['tracker_ids']);
        }

        return $query->get();
    }


//	public function getInfoFroEdit($project_if)
//	{
//		$projects = Project::select('name', 'id')->get()->toArray();
//		$user_ids = Issue::where('project_id', $project_if)->select('assigned_to_id', 'author_id')->get()->toArray();
//		$users = User::whereIn('id', $user_ids)->get()->toArray();
//		return ['projects' => $projects, 'users' => $users];
//	}
}