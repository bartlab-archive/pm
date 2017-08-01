<?php

namespace App\Services;

use App\Models\Issue;
use App\Models\Project;
use App\Models\IssueStatuse;
use App\Models\Tracker;
use App\Models\User;
use Illuminate\Support\Facades\DB;

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

    public function all($id, $params)
    {
        if ($params) {
            $statusIdsString = count($params['status_ids']) ? implode(",", $params['status_ids']) : false;
            $trackerIdsString = count($params['tracker_ids']) ? implode(",", $params['tracker_ids']) : false;

            if ($trackerIdsString && $statusIdsString) {
                $queryString = "status_id in ($statusIdsString) and tracker_id in ($trackerIdsString)";
            } else if ($statusIdsString) {
                $queryString = "status_id in ($statusIdsString)";
            } else if ($trackerIdsString) {
                $queryString = "tracker_id in ($trackerIdsString)";
            } else {
                $queryString = false;
            }

            if ($queryString) {
                return Issue::join('projects', 'issues.project_id', '=', 'projects.id')
                    ->where('projects.identifier', $id)
                    ->whereRaw($queryString)
                    ->limit(20)
                    ->with(['trackers', 'user', 'author', 'project'])
                    ->get();
            }
        }

        return Issue::join('projects', 'issues.project_id', '=', 'projects.id')
            ->where('projects.identifier', $id)
            ->limit(20)
            ->with(['trackers', 'user', 'author', 'project'])
            ->get();
    }

    public function getIssueStatuses()
    {
        return IssueStatuse::all();
    }

    public function getIssueTrackers()
    {
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