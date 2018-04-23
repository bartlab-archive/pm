<?php

namespace App\Http\Controllers;

use App\Http\Requests\Projects\ProjectExistsRequest;
use App\Http\Resources\RolesResource;
use App\Services\RolesService;
use Illuminate\Http\Request;
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
        return RolesResource::collection(
            $this->rolesService->all()
        );
    }
}