<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\TrackerResource;
use App\Services\ProjectsService;
use App\Services\IssuesService;
use Illuminate\Routing\Controller as BaseController;
use App\Http\Requests\Issues\StoreTrackerRequest;

/**
 * Class TrackersController
 *
 * @property IssuesService $issuesService
 * @property ProjectsService $projectsService
 *
 * @package App\Http\Controllers\Projects
 */
class TrackersController extends BaseController
{

    protected $issuesService;
    protected $projectsService;

    public function __construct(
        ProjectsService $projectsService,
        IssuesService $issuesService
    )
    {
        $this->issuesService = $issuesService;
        $this->projectsService = $projectsService;
    }

    public function index($identifier = null)
    {
        // todo: check project
//        $identifier = $request->input('project_identifier');

        $project = $identifier ? $this->projectsService->oneByIdentifier($identifier) : null;

        return TrackerResource::collection(
            $this->issuesService->trackers($project ? $project->id : null)
        );
    }

    public function store(StoreTrackerRequest $request)
    {
        if (!$tracker = $this->issuesService->createTracker($request->validated())) {
            abort(422);
        }

        return TrackerResource::make($tracker);
    }

    public function show($id)
    {
        if (!$tracker = $this->issuesService->tracker($id)) {
            abort(404);
        }

        return TrackerResource::make($tracker);
    }

    public function update($id, StoreTrackerRequest $request)
    {
        if (!$tracker = $this->issuesService->updateTracker($id, $request->validated())) {
            abort(422);
        }

        return TrackerResource::make($tracker);
    }

    public function destroy($id)
    {
        if (!$this->issuesService->tracker($id)) {
            abort(404);
        }

        if (!$this->issuesService->deleteTracker($id)) {
            abort(422);
        }

        return response(null, 204);
    }
}
