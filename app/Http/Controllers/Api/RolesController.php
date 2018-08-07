<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\RoleResource;
use App\Services\RolesService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class RolesController
 *
 * @property RolesService $rolesService
 *
 * @package App\Http\Controllers\Projects
 */
class RolesController extends BaseController
{

    /**
     * @var RolesService
     */
    protected $rolesService;

    /**
     * RolesController constructor.
     * @param RolesService $rolesService
     */
    public function __construct(RolesService $rolesService)
    {
        $this->rolesService = $rolesService;
    }

    public function index()
    {
        return RoleResource::collection(
            $this->rolesService->all()
        );
    }
}