<?php

namespace App\Services;

use App\Models\EnabledModule;

/**
 * Class EnabledModulesService
 *
 * @property ProjectsService $projectService
 *
 * @package App\Services
 */
class EnabledModulesService
{
    /**
     * @var ProjectsService
     */
    protected $projectService;

    /**
     * EnabledModulesService constructor.
     * @param ProjectsService $projectService
     */
    function __construct(ProjectsService $projectService)
    {
        $this->projectService = $projectService;
    }

    /**
     * Update project enabled modules
     *
     * @param string $identifier
     * @param array $data
     * @return bool
     */
    public function massUpdate($identifier, $data)
    {
        $project = $this->projectService->one($identifier);

        EnabledModule::where(['project_id' => $project->id])->delete();

        foreach ($data as $moduleName) {
            EnabledModule::create([
                'project_id' => $project->id,
                'name' => $moduleName
            ]);
        }

        return true;
    }

    /**
     * Create project enabled modules
     *
     * @param int $projectId
     * @param array $data
     * @return bool
     */
    public function massCreate($projectId, $data)
    {
        foreach ($data as $moduleName) {
            EnabledModule::create([
                'project_id' => $projectId,
                'name' => $moduleName
            ]);
        }

        return true;
    }
}