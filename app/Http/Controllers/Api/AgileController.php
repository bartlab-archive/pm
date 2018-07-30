<?php

namespace App\Http\Controllers\Api;

use App\Services\StatusesService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class IssueStatuseController
 *
 * @property IssueStatusesController $statusesService
 *
 */
class AgileController extends BaseController
{
	/**
	 * Statuses constructor.
	 * @param StatusesService $statusesService
	 */
	public function __construct(StatusesService $statusesService)
	{
		$this->statusesService = $statusesService;
	}

	/**
	 * @param Request $request
	 * @return mixed
	 */
	public function getList(Request $request)
	{
		return $this->statusesService->getList($request->all());
	}
}