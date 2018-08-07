<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Issues\IndexProjectTrackersRequest;
use App\Http\Resources\TrackerStateResource;
use App\Services\IssuesService;
use App\Services\ProjectsService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class TrackersController
 *
 * @property ProjectsService $projectsService
 * @property IssuesService $issuesService
 *
 * @package App\Http\Controllers\Projects
 */
class ProjectTrackersController extends BaseController
{

    protected $projectsService;
    protected $issuesService;

    public function __construct(
        IssuesService $issuesService,
        ProjectsService $projectsService
    )
    {
        $this->projectsService = $projectsService;
        $this->issuesService = $issuesService;
    }

    public function index($identifier)
    {
        if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
            abort(404);
        }

        return TrackerStateResource::collection(
            $this->issuesService->trackersState($project->id)
        );
    }

    public function update($identifier, IndexProjectTrackersRequest $request)
    {
        if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
            abort(404);
        }

        if (!$this->issuesService->updateTrackersState($project->id, $request->input('trackers'))) {
            abort(422);
        }

        return TrackerStateResource::collection(
            $this->issuesService->trackersState($project->id)
        );
    }
}