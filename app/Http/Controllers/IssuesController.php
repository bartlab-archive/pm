<?php

namespace App\Http\Controllers;

use App\Http\Requests\Issues\GetIssuesRequest;
use App\Http\Requests\Issues\UpdateIssueRequest;
use App\Services\EnumerationsService;
use App\Services\IssueCategoriesService;
use App\Services\IssuesService;
use App\Services\ProjectsService;
use App\Services\StatusesService;
use App\Services\TrackersService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class IssuesController extends BaseController
{
    protected $issueService;
    protected $statusesService;
    protected $trackersService;
    protected $projectsService;
    protected $categoriesService;
    protected $enumerationsService;

    public function __construct(IssuesService $issueService, StatusesService $statusesService,
                                TrackersService $trackersService, ProjectsService $projectsService,
                                EnumerationsService $enumerationsService, IssueCategoriesService $categoriesService)
    {
        $this->issueService = $issueService;
        $this->statusesService = $statusesService;
        $this->trackersService = $trackersService;
        $this->projectsService = $projectsService;
        $this->categoriesService = $categoriesService;
        $this->enumerationsService = $enumerationsService;
    }

    public function project($identifier, GetIssuesRequest $request)
    {
        $data = $this->issueService->list($identifier, $request->all());
        return response()
            ->json($data['issues'], 200)
            ->header('X-Total', $data['count']);
    }

    // -----

//	public function getIssues(Request $request)
//    {
//    	$issues = $this->issueService->all($request->all());
//
//        return response()->json($issues['result'], 200)->header('X-Total', $issues['total']);
//    }
//
//	public function testNotExistIssue()
//	{
//		$response = $this->get('/api/v1/issues/'. $this->findNotExistId());
//
//		$response->assertStatus(404);
//	}
//
    public function getIssue($id)
    {
        $issue = $this->issueService->one($id);
        return is_null($issue) ? response('Not Found', 404) : response()->json($issue, 200);
    }

    public function getIssuesFilters()
    {
        $response = [];

        $statuses = $this->statusesService->getStatuses();
        $trackers = $this->trackersService->getTrackers();
        $priorities = $this->enumerationsService->getPrioritiesList();

        if (!is_null($statuses)) {
            $response['statuses'] = $statuses;
        }

        if (!is_null($trackers)) {
            $response['trackers'] = $trackers;
        }

        if (!is_null($priorities)) {
            $response['priorities'] = $priorities;
        }

        return response()->json($response, 200);
    }

    public function getCount($identifier)
    {
        $count = $this->issueService->getCount($identifier);
        return response()->json($count, 200);
    }

    public function getAdditionalInfo($id)
    {
        $data = [
            'projectsList' => $this->projectsService->getProjectsList(),
            'trackersList' => $this->trackersService->getTrackersList(),
            'statusesList' => $this->statusesService->getStatuses(),
            'prioritiesList' => $this->enumerationsService->getPrioritiesList()
        ];
        return response()->json($data, 200);
    }

    public function postUpdate($id, UpdateIssueRequest $request)
    {
        $data = $request->except(['id', 'trackers', 'user', 'author', 'statusText', 'project']);
        $data['start_date'] = Carbon::parse($data['start_date'])->format('Y-m-d');
        $data['due_date'] = Carbon::parse($data['due_date'])->format('Y-m-d');

        if ($this->issueService->update($id, $data)) {
            $response = $this->issueService->one($id);

            return response()->json($response, 200);
        }

        return response()->json('Not Found', 404);
    }

//    public function infoEdit($id, $project_id)
//    {
//        $result = $this->issueService->getInfoFroEdit($project_id);
//
//        return response()->json([$result], 200);
//    }


}
