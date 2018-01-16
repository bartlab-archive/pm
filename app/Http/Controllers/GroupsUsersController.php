<?php

namespace App\Http\Controllers;

use App\Services\GroupsUsersService;
use App\Services\RolesService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class GroupsUsersController
 *
 * @property GroupsUsersController $groupsService
 *
 */
class GroupsUsersController extends BaseController
{

    /**
     * @var RolesService
     */
    protected $groupsUsersService;

    /**
     * RolesController constructor.
     * @param GroupsUsersService $enumerationsService
     */
    public function __construct(GroupsUsersService $groupsUsersService)
    {
        $this->groupsUsersService = $groupsUsersService;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getList(Request $request)
    {
        return $this->groupsUsersService->getList($request->all());
    }

	public function one($id)
	{
		return $this->groupsUsersService->one($id);
	}

	public function create(Request $request)
	{
		$group = $this->groupsUsersService->create($request->all());
		return response($group, 201);
	}

	public function destroy($id){
		$this->groupsUsersService->delete($id);
		return response(null, 204);
	}
}