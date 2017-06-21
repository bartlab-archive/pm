<?php

namespace App\Services;

use App\Models\Project;

class ProjectsService
{
    public function all($isClosed = null)
    {
        $projects = Project::orderBy('name')
            ->where('status', Project::ACTIVE_STATUS)
            ->with([
                'members',
                'versions',
                'issue_categories',
                'repositories',
                'boards',
            ]);

        if ($isClosed) {
            $projects->orWhere('status', Project::CLOSED_STATUS);
        }

        return $projects->get()->makeVisible(['is_my']);
    }

    public function one($identifier)
    {
        return Project::whereIdentifier($identifier)
            ->with(['trackers', 'enabled_modules'])->first();
    }

    public function getAttachments($projectId)
    {
        $project = Project::find($projectId)->first();
        if ($project) {
            return $project->attachments;
        }
        return collect();
    }
}