<?php

namespace App\Http\Controllers;

use App\Http\Requests\Issues\GetIssuesRequest;
use App\Http\Requests\Issues\UpdateIssueRequest;
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

    public function one($id, Request $request)
    {
        if (!$issue = $this->issueService->one($id)) {
            return abort(404);
        }

        /*
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

        return response()->json($issue, 200);
    }

    public function all(GetIssuesRequest $request)
    {
        if ($projectIdentifier = $request->get('project_identifier')) {
            if (!$project = $this->projectsService->one($projectIdentifier)) {
                abort(404);
            }

            /*
             * Need check:
             *  - is module enambled for project
             *  - is user allow to view issue
             *  - project status
             */
            if (!$this->enabledModulesService->check(
                $project->identifier,
                $this->issueService::MODULE_NAME
            )) {
                return abort(403);
            }
        }

        $data = $this->issueService->all($request->all());

        return response()
            ->json([
                'list' => $data['list'],
                'groups' => $data['groups']
            ], 200)
            ->withHeaders([
                'X-Total' => $data['total'],
                'X-Limit' => $data['limit'],
                'X-Offset' => $data['offset'],
            ]);
    }

    public function filters(Request $request)
    {
        return response()->json(
            [
                'statuses' => $this->statusesService->all(),
                'trackers' => $this->trackersService->all(),
                'priorities' => $this->enumerationsService->all([
                    'type' => Issue::ENUMERATION_PRIORITY,
                    'project_identifier' => $request->get('project_identifier')
                ])
            ], 200);
    }

    public function create(UpdateIssueRequest $request)
    {
        $data = $request->all();
        $data['author_id'] = Auth::id();
        $data['start_date'] = Carbon::create()->format('Y-m-d');

        return response()->json($this->issueService->create($data), 200);
    }

    public function update($id, UpdateIssueRequest $request)
    {
        $data = $request->except(['id', 'trackers', 'user', 'author', 'statusText', 'project', 'watch_state']);
        $data['start_date'] = Carbon::parse($data['start_date'])->format('Y-m-d');
        $data['due_date'] = Carbon::parse($data['due_date'])->format('Y-m-d');

        if ($this->issueService->update($id, $data)) {
            return response()->json($this->issueService->one($id), 200);
        }

        return response()->json('Not Found', 404);
    }

    public function delete($id)
    {
        return response()->json($this->issueService->delete($id), 200);
    }

    public function history($id)
    {
        $data = $this->journalsService->getList(['journalized_id' => $id], ['journalDetails', 'user']);

        return response()->json($data, 200);
    }

    public function watch($id)
    {
        $data = [
            'watchable_type' => 'Issue',
            'watchable_id' => $id,
            'user_id' => Auth::id()
        ];

        return response()->json($this->watchersService->startWatching($data), 200);
    }

    public function unwatch($id)
    {
        $data = [
            'watchable_id' => $id,
            'user_id' => Auth::id()
        ];

        return response()->json($this->watchersService->stopWatching($data), 200);
    }
}
