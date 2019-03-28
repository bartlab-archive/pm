<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\TrackerResource;
use App\Services\ProjectsService;
use App\Services\IssuesService;
use Illuminate\Routing\Controller as BaseController;

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

    public function store()
    {
        return response('', 204);
    }

    public function show($id)
    {
        if (!$tracker = $this->issuesService->tracker($id)) {
            abort(404);
        }

        return TrackerResource::make($tracker);
    }

    public function update()
    {
        return response('', 204);
    }

    public function destroy()
    {
        return response('', 204);
    }
}
