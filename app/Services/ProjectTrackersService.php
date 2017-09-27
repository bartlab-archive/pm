<?php

namespace App\Services;

use App\Models\ProjectsTracker;

/**
 * Class EnabledModulesService
 *
 * @package App\Services
 */
class ProjectTrackersService
{
    /**
     * Create project enabled trackers
     *
     * @param int $projectId
     * @param array $data
     * @return bool
     */
    public function massCreate($projectId, $data)
    {
        foreach ($data as $trackerId) {
            ProjectsTracker::create([
                'project_id' => $projectId,
                'tracker_id' => $trackerId
            ]);
        }

        return true;
    }
}