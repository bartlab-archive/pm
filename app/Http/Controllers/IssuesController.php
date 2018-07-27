<?php

namespace App\Http\Controllers;

use App\Http\Requests\Issues\GetIssuesRequest;
use App\Http\Requests\Issues\CreateIssueRequest;
use App\Http\Requests\Issues\UpdateIssueRequest;
use App\Http\Resources\IssueCollection;
use App\Http\Resources\IssueResource;
use App\Services\EnabledModulesService;
use App\Services\EnumerationsService;
use App\Services\IssuesService;
use App\Services\ProjectsService;
use App\Services\TrackersService;
use App\Services\UsersService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class IssuesController
 *
 * @property IssuesService $issuesService
 * @property TrackersService $trackersService
 * @property ProjectsService $projectsService
 * @property EnumerationsService $enumerationsService
 * @property EnabledModulesService $enabledModulesService
 *
 * @package App\Http\Controllers
 */
class IssuesController extends BaseController
{
    protected $issuesService;
    protected $trackersService;
    protected $projectsService;
    protected $enumerationsService;
    protected $enabledModulesService;
    protected $usersService;

    public function __construct(
        IssuesService $issuesService,
        TrackersService $trackersService,
        ProjectsService $projectsService,
        EnumerationsService $enumerationsService,
        EnabledModulesService $enabledModulesService,
        UsersService $usersService
    )
    {
        $this->issuesService = $issuesService;
        $this->trackersService = $trackersService;
        $this->projectsService = $projectsService;
        $this->enumerationsService = $enumerationsService;
        $this->enabledModulesService = $enabledModulesService;
        $this->usersService = $usersService;
    }

    protected function checkProject($identifier, $abort = true)
    {
        // check that the project exists
        if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
            return $abort ? abort(404) : false;
        }

        // check project status
        if ($project->isArchived()) {
            return $abort ? abort(403) : false;
        }

        // check module status for project
        if (!$this->enabledModulesService->check($project->id, $this->issuesService::MODULE_NAME)) {
            return $abort ? abort(403) : false;
        }

        if (!\Auth::admin()) {
            $userIds = $this->usersService->memberIds(\Auth::id());

            // check user for the right to view issues in this project
            if (!$this->projectsService->isMember($project->id, $userIds)) {
                return $abort ? abort(403) : false;
            }
        }

        return $project;
    }

    public function index(GetIssuesRequest $request)
    {
        if ($identifier = $request->get('project_identifier')) {
            $this->checkProject($identifier);
        }

        return IssueCollection::make(
            $this->issuesService->all(
                array_merge(
                    $request->validated(),
                    \Auth::admin() ? [] : ['user_id' => \Auth::id()]
                )
            )
        );
    }

    public function show($id)
    {
        if (!$issue = $this->issuesService->one($id)) {
            abort(404);
        }

        if (!$issue->project_id || !$issue->project) {
            abort(403);
        }

        $this->checkProject($issue->project->identifier);

        return IssueResource::make($issue);
    }

//    public function filters(Request $request)
//    {
//        return response([
//            'statuses' => StatusResource::collection($this->issuesService->statuses()),
//            'trackers' => TrackerResource::collection($this->trackersService->all()),
//            'priorities' => PriorityResource::collection(
//                $this->enumerationsService->all([
//                    'type' => Issue::ENUMERATION_PRIORITY,
//                    'project_identifier' => $request->get('project_identifier')
//                ])
//            )
//        ]);
//    }

    public function store(CreateIssueRequest $request)
    {
        $project = $this->checkProject($request->get('project_identifier'));

        // create new issue
        $issue = $this->issuesService->create(
            array_merge(
                $request->validated(),
                [
                    'project_id' => $project->id,
                    'author_id' => \Auth::id()
                ]
            )
        );

        if (!$issue) {
            // todo: add error message
            abort(422);
        }

        return IssueResource::make($issue);
    }

    public function update($id, UpdateIssueRequest $request)
    {
        if (!$issue = $this->issuesService->one($id)) {
            abort(404);
        }

        if (!$issue->project_id || !$issue->project) {
            abort(403);
        }

        $this->checkProject($issue->project->identifier);

        $data = array_merge(
            $request->validated(),
            ['user_id' => \Auth::id()]
        );

        // check project if this change for issue
        if (
            ($identifier = $request->get('project_identifier')) &&
            ($issue->project->identifier !== $identifier) &&
            ($project = $this->checkProject($identifier, false))
        ) {
            $data['project_id'] = $project->id;
        }

        if (!$issue = $this->issuesService->update($id, $data)) {
            // todo: add error message
            abort(422);
        }

        return IssueResource::make($issue);
    }

    public function destroy($id)
    {
        if (!$issue = $this->issuesService->one($id)) {
            abort(404);
        }

        if (!$issue->project_id || !$issue->project) {
            abort(403);
        }

        $this->checkProject($issue->project->identifier);

        // todo: full check issue and project
        if (!$this->issuesService->delete($id)) {
            abort(422);
        }

        return response(null, 204);
    }

    public function watch($id)
    {
        if (!$issue = $this->issuesService->one($id)) {
            abort(404);
        }

        if (!$issue->project_id || !$issue->project) {
            abort(403);
        }

        $this->checkProject($issue->project->identifier);

        if (!$this->issuesService->watch($id, \Auth::id())) {
            abort(422);
        }

        return response(null, 204);
    }

    public function unwatch($id)
    {
        if (!$issue = $this->issuesService->one($id)) {
            abort(404);
        }

        if (!$issue->project_id || !$issue->project) {
            abort(403);
        }

        $this->checkProject($issue->project->identifier);

        if (!$this->issuesService->unwatch($id, \Auth::id())) {
            abort(422);
        }

        return response(null, 204);
    }
}
