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
     * @param array $data
     * @return bool
     */
    public function update($data)
    {
        $project = $this->projectService->one($data['identifier']);

        EnabledModule::where(['project_id' => $project->id])->delete();

        foreach ($data['enabled_module_names'] as $moduleName) {
            EnabledModule::create([
                'project_id' => $project->id,
                'name' => $moduleName
            ]);
        }

        return true;
    }
}