<?php

namespace App\Services;

use App\Models\EnabledModule;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

/**
 * Class EnabledModulesService
 *
 * @property ProjectsService $projectService
 *
 * @package App\Services
 */
class EnabledModulesService
{
//    protected $projectService;
//
//    public function __construct(ProjectsService $projectService)
//    {
//        $this->projectService = $projectService;
//    }

    /**
     * Get all available modules list
     */
    public function availableList()
    {
        return collect(array_map(function ($item) {
            return (object)$item;
        }, EnabledModule::$modules));
    }

    /**
     * Get list enabled modules by project identifier
     *
     * @param integer $projectId project id
     * @return \Illuminate\Database\Eloquent\Collection|Collection|static[]
     */
    public function getByProject($projectId)
    {
        return EnabledModule::query()
            ->where(['project_id' => $projectId])
//            ->whereHas('project', function ($query) use ($identifier) {
//                /** @var $query Builder */
//                $query->where('identifier', $identifier);
//            })
            ->get();
    }

    /**
     * Check module state for project
     *
     * @param integer $projectId project id
     * @param string $name module name
     * @return bool
     */
    public function check($projectId, $name): bool
    {
        return \in_array($name, $this->getByProject($projectId)->pluck('name')->all(), true);
    }

    public function update($projectId, array $data)
    {
        $list = $this->getByProject($projectId)->pluck('name')->all();

//        if (!$project = $this->projectService->oneById($projectId)) {
//            return;
//        }

        foreach ($data as $module) {
            if (!empty($module['enable']) && !\in_array($module['name'], $list, true)) {
                EnabledModule::create(['project_id' => $projectId, 'name' => $module['name']]);
            }

            if (empty($module['enable']) && \in_array($module['name'], $list, true)) {
                EnabledModule::query()
                    ->where(['project_id' => $projectId, 'name' => $module['name']])
                    ->delete();
            }
        }
    }
}