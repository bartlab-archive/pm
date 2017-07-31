<?php

namespace App\Services;

use App\Models\Issue;
use App\Models\Project;
use App\Models\IssueStatuse;
use App\Models\Tracker;
use App\Models\User;

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

    public function all($params)
    {
        if ($params) {
            $queryString = '';
            if ($params['status_ids']) {
                $queryString = implode(",", $params['status_ids']);
                return Issue::whereRaw("status_id in ($queryString)")
                    ->limit(20)
                    ->with(['trackers', 'user', 'author', 'project'])
                    ->get();
            }

//            if ($params['status_ids']) {
//                $queryString = implode(",", $params['tracker_ids']);
//            }

        }

        return Issue::take(20)
            ->with(['trackers', 'user', 'author', 'project'])
            ->get();
    }

    public function getIssueStatuses() {
        return IssueStatuse::all();
    }

    public function getIssueTrackers() {
        return Tracker::all();
    }

//	public function getInfoFroEdit($project_if)
//	{
//		$projects = Project::select('name', 'id')->get()->toArray();
//		$user_ids = Issue::where('project_id', $project_if)->select('assigned_to_id', 'author_id')->get()->toArray();
//		$users = User::whereIn('id', $user_ids)->get()->toArray();
//		return ['projects' => $projects, 'users' => $users];
//	}
}