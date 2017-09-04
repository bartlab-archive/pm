<?php

namespace App\Services;

use App\Models\Version;


/**
 * Class VersionsService
 *
 * @property ProjectsService $projectsService
 *
 * @package App\Services
 */
class VersionsService
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
    public function create($identifier, $data)
    {
        $project = $this->projectsService->one($identifier);
        $data['project_id'] = $project->id;

        $memberRole = new Version($data);
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
        return Version::find($versionId)->delete();
    }

    /**
     * Edit Version
     *
     * @param $versionId
     * @param $data
     * @return mixed
     */
    public function update($versionId, $data)
    {
        $version = Version::where(['id' => $versionId])->firstOrFail();
        return $version->update($data);
    }

    public function closeCompleted($identifier)
    {
        $project = $this->projectsService->one($identifier);
        return Version::where(['project_id' => $project->id])
            ->where('effective_date', '<', date('Y-m-d'))
            ->update(['status' => 'closed']);
    }
}