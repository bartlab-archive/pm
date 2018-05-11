<?php

namespace App\Http\Controllers;

use App\Http\Requests\Issues\GetIssuesRequest;
use App\Http\Requests\Issues\StoreIssueRequest;
use App\Http\Resources\IssueCollection;
use App\Http\Resources\IssueResource;
use App\Http\Resources\PriorityResource;
use App\Http\Resources\StatusResource;
use App\Http\Resources\TrackerResource;
use App\Http\Resources\WatcherResource;
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
use Carbon\Carbon;
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
 * @property JournalsService $journalsService
 * @property WatchersService $watchersService
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
    protected $journalsService;
    protected $watchersService;
    protected $enabledModulesService;

    public function __construct(
        IssuesService $issueService,
        StatusesService $statusesService,
        TrackersService $trackersService,
        ProjectsService $projectsService,
        EnumerationsService $enumerationsService,
        IssueCategoriesService $categoriesService,
        JournalsService $journalsService,
        WatchersService $watchersService,
        EnabledModulesService $enabledModulesService
    )
    {
        $this->issueService = $issueService;
        $this->statusesService = $statusesService;
        $this->trackersService = $trackersService;
        $this->projectsService = $projectsService;
        $this->categoriesService = $categoriesService;
        $this->enumerationsService = $enumerationsService;
        $this->journalsService = $journalsService;
        $this->watchersService = $watchersService;
        $this->enabledModulesService = $enabledModulesService;
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
//        return response()->json($issue, 200);
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

    public function create(StoreIssueRequest $request)
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

        // add watchers
        $this->watchersService->massCreate(
            $issue->id,
            $this->issueService->morph(),
            $request->input('watchers', [])
        );

        return IssueResource::make($issue);
    }

    public function update($id, StoreIssueRequest $request)
    {
//        $data = $request->except(['id', 'trackers', 'user', 'author', 'statusText', 'project', 'watch_state']);
//        $data['start_date'] = Carbon::parse($data['start_date'])->format('Y-m-d');
//        $data['due_date'] = Carbon::parse($data['due_date'])->format('Y-m-d');

//        if ($this->issueService->update($id, $data)) {
//            return response()->json($this->issueService->one($id), 200);
//        }

//        return response()->json('Not Found', 404);

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

        // todo: show for change watchers and add item to journal
        if (!$issue = $this->issueService->update($id, array_merge(
                $request->validated(),
                ['project_id' => $project->id]
            )
        )){
            return abort( 422);
        }

        return IssueResource::make($issue);
    }

    public function delete($id)
    {
        return response()->json($this->issueService->delete($id), 200);
    }

//    public function history($id)
//    {
//        $data = $this->journalsService->getList(['journalized_id' => $id], ['journalDetails', 'user']);
//
//        return response()->json($data, 200);
//    }

    public function watch($id)
    {
        return WatcherResource::make(
            $this->watchersService->create($id, $this->issueService->morph(), \Auth::id())
        );
    }

    public function unwatch($id)
    {
        if (!$watcher = $this->watchersService->one($id, $this->issueService->morph(), \Auth::id())) {
            abort(404);
        }

        $this->watchersService->delete($watcher->id);

        // return deleted row
        return WatcherResource::make($watcher);
    }
}
