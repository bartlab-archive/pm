<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\IssuesStatuseResource;
use App\Services\IssuesService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class IssueStatuseController
 *
 * @property IssueStatusesController $statusesService
 *
 */
class IssueStatusesController extends BaseController
{
    private $issuesService;

    public function __construct(IssuesService $issuesService)
    {
        $this->issuesService = $issuesService;
    }

    public function index()
    {
        return IssuesStatuseResource::collection(
            $this->issuesService->statuses()
        );
    }
}