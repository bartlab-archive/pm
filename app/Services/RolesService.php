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
     * @param array $params
     * @return mixed
     */
    public function getList($params = [])
    {
        $roles = Role::orderBy('name');
        !empty($params) ? $roles->where($params) : null;

        return $roles->get();
    }
}