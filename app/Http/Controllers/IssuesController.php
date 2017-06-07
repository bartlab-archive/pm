<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Issue;

class IssuesController extends Controller
{
    public function getIssues()
    {
        $result = Issue::join('users', 'issues.assigned_to_id', '=', 'users.id')
                        ->select('issues.*', 'users.firstname as firstname', 'users.lastname as lastname')
                        ->get();

        return response()->json($result, 200);
    }

    public function getIssue($identifier)
    {
        $result = Issue::where('issues.id', $identifier)->join('users', 'issues.assigned_to_id', '=', 'users.id')
                        ->select('issues.*', 'users.firstname as firstname', 'users.lastname as lastname')
                        ->first();

        return response()->json($result);
    }


}
