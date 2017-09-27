<?php

namespace App\Http\Controllers;

use App\Http\Requests\Projects\ProjectExistsRequest;
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

    /**
     * @param Request $request
     * @return mixed
     */
    public function getList(Request $request)
    {
        return $this->rolesService->getList($request->all());
    }
}