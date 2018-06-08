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
use App\Services\ProjectsService;
use App\Services\StatusesService;
use App\Services\TrackersService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class IssuesController
 *
 * @property IssuesService $issuesService
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
    protected $issuesService;
    protected $statusesService;
    protected $trackersService;
    protected $projectsService;
    protected $categoriesService;
    protected $enumerationsService;
    protected $enabledModulesService;

    public function __construct(
        IssuesService $issuesService,
        StatusesService $statusesService,
        TrackersService $trackersService,
        ProjectsService $projectsService,
        EnumerationsService $enumerationsService,
        IssueCategoriesService $categoriesService,
        EnabledModulesService $enabledModulesService
    )
    {
        $this->issuesService = $issuesService;
        $this->statusesService = $statusesService;
        $this->trackersService = $trackersService;
        $this->projectsService = $projectsService;
        $this->categoriesService = $categoriesService;
        $this->enumerationsService = $enumerationsService;
        $this->enabledModulesService = $enabledModulesService;
    }

    public function index(GetIssuesRequest $request)
    {
        if ($identifier = $request->get('project_identifier')) {
            if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
                abort(404);
            }

            /*
             * todo:
             * Need check:
             *  - is module enambled for project
             *  - is user allow to view issue
             *  - project status
             */
            if (!$this->enabledModulesService->check($project->id, $this->issuesService::MODULE_NAME)) {
                abort(403);
            }
        }

        // todo: get only needed fields from request
        return IssueCollection::make(
            $this->issuesService->all($request->all())
        );
    }

    public function show($id)
    {
        if (!$issue = $this->issuesService->one($id)) {
            abort(404);
        }
        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$issue->project_id || !$this->enabledModulesService->check($issue->project_id, $this->issuesService::MODULE_NAME)) {
            abort(403);
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
        if (!$project = $this->projectsService->oneByIdentifier($request->get('project_identifier'))) {
            abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->enabledModulesService->check($project->id, $this->issuesService::MODULE_NAME)) {
            abort(403);
        }

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

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->enabledModulesService->check($issue->project_id, $this->issuesService::MODULE_NAME)) {
            abort(403);
        }

        $data = array_merge(
            $request->validated(),
            ['user_id' => \Auth::id()]
        );

        // check new project for issue
        if ($identifier = $request->get('project_identifier')) {
            $project = $this->projectsService->oneByIdentifier($identifier);

            // todo: check project status
            if ($project->id !== $issue->project_id && $this->enabledModulesService->check($project->id, $this->issuesService::MODULE_NAME)) {
                $data['project_id'] = $project->id;
            }
        }

        if (!$issue = $this->issuesService->update($id, $data)) {
            // todo: add error message
            abort(422);
        }

        return IssueResource::make($issue);
    }

    public function destroy($id)
    {
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

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$issue->project_id || !$this->enabledModulesService->check($issue->project_id, $this->issuesService::MODULE_NAME)) {
            abort(403);
        }

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

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$issue->project_id || !$this->enabledModulesService->check($issue->project_id, $this->issuesService::MODULE_NAME)) {
            abort(403);
        }

        if (!$this->issuesService->unwatch($id, \Auth::id())) {
            abort(422);
        }

        return response(null, 204);
    }
}
