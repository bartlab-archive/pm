<?php

namespace App\Services;

use App\Models\Role;


/**
 * Class RolesService
 *
 * @property ProjectsService $projectService
 *
 * @package App\Services
 */
class RolesService
{

    /**
     * Get roles list
     *
     * @return mixed
     */
    public function all(array $params = [])
    {
        $query = Role::query()
            ->orderBy('position');

        if (array_get($params, 'builtin', false) === false) {
            $query->where(['builtin' => 0]);
        }

        return $query->get();
    }

    public function one($id)
    {
        return Role::query()->where(['id' => $id])->first();
    }
}