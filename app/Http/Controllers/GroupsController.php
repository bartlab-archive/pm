<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GroupsService;
use Illuminate\Routing\Controller as BaseController;

class GroupsController extends BaseController
{
	/**
	 * @var GroupsService
	 */
	protected $groupsService;

	public function __construct(GroupsService $groupsService)
	{
		$this->groupsService = $groupsService;
	}

	/**
	 * @param Request $request
	 * @return mixed
	 */
	public function getList(Request $request)
	{
		return $this->groupsService->getList($request->all());
	}

	public function create(Request $request)
	{
		$group = $this->groupsService->create($request->all());
		return response($group, 200);
	}

	public function destroy($id){
		$this->groupsService->delete($id);
		return response(null, 204);
	}

	public function one($id)
	{
		return $this->groupsService->one($id);
	}

	public function update($id, Request $request)
	{
		$result = $this->groupsService->update($id , $request->all());
		return response((string)$result, 200);
	}
}
