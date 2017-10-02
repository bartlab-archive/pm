<?php

namespace App\Http\Controllers;

use App\Http\Requests\Issues\GetIssuesRequest;
use App\Http\Requests\Issues\UpdateIssueRequest;
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

    public function __construct(
        IssuesService $issueService,
        StatusesService $statusesService,
        TrackersService $trackersService,
        ProjectsService $projectsService,
        EnumerationsService $enumerationsService,
        IssueCategoriesService $categoriesService,
        JournalsService $journalsService,
        WatchersService $watchersService
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
    }

    public function project($identifier, GetIssuesRequest $request)
    {
        $data = $this->issueService->list($identifier, $request->all());

        return response()
            ->json($data['issues'], 200)
            ->header('X-Total', $data['count']);
    }

    public function getIssue($id, Request $request)
    {
        $issue = $this->issueService->one($id);
        $issue['watch_state'] = $this->watchersService->isWatched($id);

        $response = [
            'projectsList' => $this->projectsService->list(),
            'trackersList' => $this->trackersService->all(),
            'statusesList' => $this->statusesService->all(),
            'prioritiesList' => $this->enumerationsService->getList(['type' => $request->enumeration_type]),
            'project' => $this->projectsService->one(array_get($issue, 'project.identifier')),
            'issue' => $issue
        ];

        return response()->json($response, 200);
    }

    public function getIssuesFilters(Request $request)
    {
        return response()->json(
            [
                'statuses' => $this->statusesService->all(),
                'trackers' => $this->trackersService->all(),
                'priorities' => $this->enumerationsService->getList(['type' => $request->enumeration_type])
            ]
            , 200);
    }

    public function getAdditionalInfo(Request $request)
    {
        return response()->json(
            [
                'projectsList' => $this->projectsService->list(),
                'trackersList' => $this->trackersService->all(),
                'statusesList' => $this->statusesService->all(),
                'prioritiesList' => $this->enumerationsService->getList(['type' => $request->enumeration_type])
            ],
            200);
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
        $data = $request->except(['id', 'trackers', 'user', 'author', 'statusText', 'project']);
        $data['start_date'] = Carbon::parse($data['start_date'])->format('Y-m-d');
        $data['due_date'] = Carbon::parse($data['due_date'])->format('Y-m-d');

        if ($this->issueService->update($id, $data)) {
            return response()->json($this->issueService->one($id), 200);
        }

        return response()->json('Not Found', 404);
    }

    public function delete($id)
    {
        return response()->json($this->issueService->deleteById($id), 200);
    }

//    public function infoEdit($id, $project_id)
//    {
//        $result = $this->issueService->getInfoFroEdit($project_id);
//
//        return response()->json([$result], 200);
//    }

    public function getHistory($id)
    {
        $data = $this->journalsService->getList(['journalized_id' => $id], ['journalDetails','user']);

        return response()->json($data, 200);
    }

    public function watch($id)
    {
        $data = [
            'watchable_type' => 'Issue',
            'watchable_id'   => $id,
            'user_id'        => Auth::id()
        ];

        return response()->json($this->watchersService->startWatching($data), 200);
    }

    public function unwatch($id)
    {
        $data = [
            'watchable_id' => $id,
            'user_id'      => Auth::id()
        ];

        return response()->json($this->watchersService->stopWatching($data), 200);
    }
}
