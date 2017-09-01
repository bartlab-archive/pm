<?php

namespace App\Services;

use App\Models\Version;


/**
 * Class VersionService
 *
 * @property ProjectsService $projectsService
 *
 * @package App\Services
 */
class VersionService
{
    protected $projectsService;

    public function __construct(ProjectsService $projectsService)
    {
        $this->projectsService = $projectsService;
    }

    /**
     * Create version
     *
     * @param $identifier
     * @param $data
     * @return bool
     */
    public function createVersion($identifier, $data)
    {
        $project = $this->projectsService->one($identifier);
        $data['project_id'] =$project->id;

        $memberRole =  new Version($data);
        return $memberRole->save();
    }

    /**
     * Delete version by id
     *
     * @param int $versionId
     * @return bool
     */
    public function deleteById($versionId)
    {
        return Version::find($versionId)->delete();;
    }

    public function editVersion($versionId, $data)
    {
        $version = Version::find($versionId)->firstOrFail();
        return $version->update($data);
    }
}