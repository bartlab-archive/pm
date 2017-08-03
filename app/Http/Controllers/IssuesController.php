<?php

namespace App\Http\Controllers;

use App\Http\Requests\Issues\GetIssuesRequest;
use Illuminate\Http\Request;
use App\Services\IssuesService;
use App\Services\StatusesService;
use App\Services\TrackersService;
use Illuminate\Routing\Controller as BaseController;

class IssuesController extends BaseController
{
    protected $issueService;
    protected $statusesService;
    protected $trackersService;

    public function __construct(IssuesService $issueService, StatusesService $statusesService, TrackersService $trackersService)
    {
        $this->issueService = $issueService;
        $this->statusesService = $statusesService;
        $this->trackersService = $trackersService;
    }

    public function project($identifier, GetIssuesRequest $request)
    {
        $data = $this->issueService->getIssuesByProjectIdentifier($identifier, $request->all());
        return response()->json($data['issues'], 200)
            ->header('X-Total', $data['count']);

//        return response()->json($issues['result'], 200)->header('X-Total', $issues['total']);
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

        if (!is_null($statuses)) {
            $response['statuses'] = $statuses;
        }

        if (!is_null($trackers)) {
            $response['trackers'] = $trackers;
        }

        return response()->json($response, 200);
    }

    public function getCount($identifier)
    {
        $count = $this->issueService->getCount($identifier);
        return response()->json($count, 200);
    }
//
//    public function postUpdate($id, Request $request)
//    {
//    	$data = $request->except(['id', 'trackers', 'user', 'author', 'statusText']);
//        $response = $this->issueService->update($id, $data);
//
//	    return $response ? response()->json('Updated', 200) : response()->json('Not Found', 404);
//    }
//
//    public function infoEdit($id, $project_id)
//    {
//        $result = $this->issueService->getInfoFroEdit($project_id);
//
//        return response()->json([$result], 200);
//    }


}
