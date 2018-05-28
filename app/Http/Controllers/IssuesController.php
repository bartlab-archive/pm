<?php

namespace App\Http\Controllers;

use App\Http\Requests\Issues\GetIssuesRequest;
use App\Http\Requests\Issues\CreateIssueRequest;
use App\Http\Requests\Issues\UpdateIssueRequest;
use App\Http\Resources\IssueCollection;
use App\Http\Resources\IssueResource;
use App\Http\Resources\PriorityResource;
use App\Http\Resources\StatusResource;
use App\Http\Resources\TrackerResource;
use App\Models\Issue;
use App\Services\EnabledModulesService;
use App\Services\EnumerationsService;
use App\Services\IssueCategoriesService;
use App\Services\IssuesService;
use App\Services\JournalsService;
use App\Services\ProjectsService;
use App\Services\StatusesService;
use App\Services\TrackersService;
use App\Services\WatchersService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

/**
 * Class IssuesController
 *
 * @property IssuesService $issueService
 * @property StatusesService $statusesService
 * @property TrackersService $trackersService
 * @property ProjectsService $projectsService
 * @property EnumerationsService $enumerationsService
 * @property IssueCategoriesService $categoriesService
 * @property EnabledModulesService $enabledModulesService
 *
 * @package App\Http\Controllers
 */
class IssuesController extends BaseController
{
    protected $issueService;
    protected $statusesService;
    protected $trackersService;
    protected $projectsService;
    protected $categoriesService;
    protected $enumerationsService;
    protected $enabledModulesService;

    public function __construct(
        IssuesService $issueService,
        StatusesService $statusesService,
        TrackersService $trackersService,
        ProjectsService $projectsService,
        EnumerationsService $enumerationsService,
        IssueCategoriesService $categoriesService,
        EnabledModulesService $enabledModulesService
    )
    {
        $this->issueService = $issueService;
        $this->statusesService = $statusesService;
        $this->trackersService = $trackersService;
        $this->projectsService = $projectsService;
        $this->categoriesService = $categoriesService;
        $this->enumerationsService = $enumerationsService;
        $this->enabledModulesService = $enabledModulesService;
    }

    public function index(GetIssuesRequest $request)
    {
        if ($projectIdentifier = $request->get('project_identifier')) {
            if (!$project = $this->projectsService->one($projectIdentifier)) {
                abort(404);
            }

            /*
             * todo:
             * Need check:
             *  - is module enambled for project
             *  - is user allow to view issue
             *  - project status
             */
            if (!$this->enabledModulesService->check($project->identifier, $this->issueService::MODULE_NAME)) {
                return abort(403);
            }
        }

        // todo: get only needed fields from request
        return IssueCollection::make(
            $this->issueService->all($request->all())
        );
    }

    public function show($id, Request $request)
    {
        if (!$issue = $this->issueService->one($id)) {
            return abort(404);
        }
        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$issue->project || !$this->enabledModulesService->check(
                $issue->project->identifier,
                $this->issueService::MODULE_NAME
            )) {
            return abort(403);
        }

        return IssueResource::make($issue);
    }

    public function filters(Request $request)
    {
        return response([
            'statuses' => StatusResource::collection($this->statusesService->all()),
            'trackers' => TrackerResource::collection($this->trackersService->all()),
            'priorities' => PriorityResource::collection(
                $this->enumerationsService->all([
                    'type' => Issue::ENUMERATION_PRIORITY,
                    'project_identifier' => $request->get('project_identifier')
                ])
            )
        ]);
    }

    public function store(CreateIssueRequest $request)
    {
        if (!$project = $this->projectsService->one($request->get('project_identifier'))) {
            abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->enabledModulesService->check($project->identifier, $this->issueService::MODULE_NAME)) {
            return abort(403);
        }

        // create new issue
        $issue = $this->issueService->create(
            array_merge(
                $request->validated(),
                [
                    'project_id' => $project->id,
                    'author_id' => Auth::id()
                ]
            )
        );

        if (!$issue) {
            // todo: add error message
            return abort(422);
        }

        return IssueResource::make($issue);
    }

    public function update($id, UpdateIssueRequest $request)
    {
        if (!$project = $this->projectsService->one($request->get('project_identifier'))) {
            abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->enabledModulesService->check($project->identifier, $this->issueService::MODULE_NAME)) {
            return abort(403);
        }

        if (!$this->issueService->one($id)) {
            return abort(404);
        }

        // todo: show for change watchers and add items to journal
        $issue = $this->issueService->update(
            $id,
            array_merge(
                $request->validated(),
                [
                    'project_id' => $project->id,
                    'user_id' => \Auth::id()
                ]
            )
        );

        if (!$issue) {
            // todo: add error message
            return abort(422);
        }

        return IssueResource::make($issue);
    }

    public function destroy($id)
    {
        // todo: full check issue and project
        if (!$this->issueService->delete($id)){
            return abort(422);
        }

        return response(null, 204);
    }

    public function watch($id)
    {
        if (!$issue = $this->issueService->one($id)) {
            return abort(404);
        }

        if (!$issue->project) {
            abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->enabledModulesService->check($issue->project->identifier, $this->issueService::MODULE_NAME)) {
            return abort(403);
        }

        if (!$this->issueService->watch($id, \Auth::id())) {
            return abort(422);
        }

        return response(null, 204);
    }

    public function unwatch($id)
    {
        if (!$issue = $this->issueService->one($id)) {
            return abort(404);
        }

        if (!$issue->project) {
            abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->enabledModulesService->check($issue->project->identifier, $this->issueService::MODULE_NAME)) {
            return abort(403);
        }

        if (!$this->issueService->unwatch($id, \Auth::id())) {
            return abort(422);
        }

        return response(null, 204);
    }
}
