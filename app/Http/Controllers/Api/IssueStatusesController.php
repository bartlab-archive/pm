<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Issues\StoreStatusRequest;
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

    public function show($id)
    {
        if (!$status = $this->issuesService->status($id)) {
            abort(404);
        }
        return IssuesStatuseResource::make($status);
    }

    public function store(StoreStatusRequest $request)
    {
        if (!$status = $this->issuesService->createStatus($request->validated())) {
            abort(422);
        }

        return IssuesStatuseResource::make($status);
    }

    public function update($id, StoreStatusRequest $request)
    {
        if (!$this->issuesService->status($id)) {
            abort(404);
        }

        if (!$status = $this->issuesService->updateStatus($id, $request->validated())) {
            abort(422);
        }

        return IssuesStatuseResource::make($status);
    }

    public function destroy($id)
    {
        if (!$this->issuesService->status($id)) {
            abort(404);
        }

        if (!$this->issuesService->removeStatus($id)) {
            abort(422);
        }

        return response(null, 204);
    }
}