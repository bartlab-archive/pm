<?php

namespace App\Http\Controllers;

use App\Services\StatusesService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class IssueStatuseController
 *
 * @property IssueStatuseController $statusesService
 *
 */
class IssueStatuseController extends BaseController
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