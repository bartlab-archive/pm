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
    	$issues = $this->issueService->all($request);
    	
        return response()->json($issues['result'], 200)->header('X-Total', $issues['total']);
    }

    public function getIssue($id)
    {
        return response()->json($this->issueService->one($id));
    }

//    public function postUpdate(Request $request)
//    {
//        dd($request);
//    }

//    public function infoEdit($id, $project_id)
//    {
//        $result = [];
//        $result['projects'] = \App\Models\Project::orderBy('name')->where('status', 1)->select('name', 'id')->get()->toArray();
//        $result['trackers'] = Tracker::select('id', 'name')->get()->toArray();
//
//        return response()->json([$result], 200);
//    }


}
