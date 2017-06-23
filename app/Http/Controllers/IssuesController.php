<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\IssuesService;

class IssuesController extends Controller
{
	protected $issueService;
	
	public function __construct(IssuesService $issueService)
	{
		$this->issueService = $issueService;
	}
	
	public function getIssues(Request $request)
    {
    	$issues = $this->issueService->all($request->all());
    	
        return response()->json($issues['result'], 200)->header('X-Total', $issues['total']);
    }
	
	public function testNotExistIssue()
	{
		$response = $this->get('/api/v1/issues/'. $this->findNotExistId());
		
		$response->assertStatus(404);
	}

    public function getIssue($id)
    {
    	$issue = $this->issueService->one($id);
        return is_null($issue) ? response('Not Found', 404) : response()->json($issue, 200);
    }

    public function postUpdate($id, Request $request)
    {
    	$data = $request->except(['id', 'trackers', 'user', 'author', 'statusText']);
        $response = $this->issueService->update($id, $data);
	    
	    return $response ? response()->json('Updated', 200) : response()->json('Not Found', 404);
    }

    public function infoEdit($id, $project_id)
    {
        $result = $this->issueService->getInfoFroEdit($project_id);

        return response()->json([$result], 200);
    }


}
