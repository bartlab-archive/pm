<?php

namespace App\Http\Controllers;

use App\Http\Requests\Projects\ProjectExistsRequest;
use App\Services\UsersService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class UsersController
 *
 * @property UsersService $usersService
 *
 * @package App\Http\Controllers\Projects
 */
class UsersController extends BaseController
{

    /**
     * @var UsersService
     */
    protected $usersService;

    /**
     * RolesController constructor.
     * @param UsersService $usersService
     * @internal param RolesService $rolesService
     */
    public function __construct(UsersService $usersService)
    {
        $this->usersService = $usersService;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getList(Request $request)
    {
        return $this->usersService->getList($request->all());
    }
}