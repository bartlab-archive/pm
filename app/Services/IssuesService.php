<?php

namespace App\Services;

use App\Models\Issue;
use App\Models\Project;
use App\Models\User;

class IssuesService
{

    public function one($id)
    {
        return Issue::where('id', $id)
            ->with(['trackers', 'user', 'author'])->first();
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
        return Issue::where('status_id', 5)->limit(20)->get();
    }

//	public function getInfoFroEdit($project_if)
//	{
//		$projects = Project::select('name', 'id')->get()->toArray();
//		$user_ids = Issue::where('project_id', $project_if)->select('assigned_to_id', 'author_id')->get()->toArray();
//		$users = User::whereIn('id', $user_ids)->get()->toArray();
//		return ['projects' => $projects, 'users' => $users];
//	}
}