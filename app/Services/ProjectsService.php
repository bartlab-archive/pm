<?php

namespace App\Services;

use App\Models\Project;

class ProjectsService
{
    public function getAttachments($projectId)
    {
        $project = Project::find($projectId)->first();
        if ($project) {
            return $project->attachments;
        }
        return [];
    }
}