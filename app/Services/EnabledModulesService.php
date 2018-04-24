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
    protected $projectService;

    public function __construct(ProjectsService $projectService)
    {
        $this->projectService = $projectService;
    }

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
     * @param string $identifier project identifier
     * @return \Illuminate\Database\Eloquent\Collection|Collection|static[]
     */
    public function getByProject(string $identifier)
    {
        return EnabledModule::query()
            ->whereHas('project', function ($query) use ($identifier) {
                /** @var $query Builder */
                $query->where('identifier', $identifier);
            })
            ->get();
    }

//    public function getEnabledByProject(string $identifier)
//    {
//        $list = $this->getByProject($identifier)
//            ->pluck('name')
//            ->all();
//
//        return collect(\array_map(
//            function ($item) use ($list) {
//                $item->enabled = \in_array($item->name, $list, true);
//                return $item;
//            },
//            $this->availableList()->toArray()
//        ));
//    }

    /**
     * Check module state for project
     *
     * @param string $identifier project identifier
     * @param string $name module name
     * @return bool
     */
    public function check(string $identifier, $name): bool
    {
        return \in_array($name, $this->getByProject($identifier)->pluck('name')->all(), true);
    }

    public function update(string $identifier, array $data)
    {
        $list = $this->getByProject($identifier)->pluck('name')->all();

        if (!$project = $this->projectService->one($identifier)) {
            return;
        }

        foreach ($data as $module) {
            if (!empty($module['enable']) && !\in_array($module['name'], $list, true)) {
                EnabledModule::create(['project_id' => $project->id, 'name' => $module['name']]);
            }

            if (empty($module['enable']) && \in_array($module['name'], $list, true)) {
                EnabledModule::query()
                    ->where(['project_id' => $project->id, 'name' => $module['name']])
                    ->delete();
            }
        }
    }
}