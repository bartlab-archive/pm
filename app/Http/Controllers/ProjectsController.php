<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectsController extends Controller
{
    public function getIssues($identifier)
    {
        $result = Project::where('identifier', $identifier)->first()->issues()
            ->join('users', 'issues.assigned_to_id', '=', 'users.id')
            ->select('issues.*', 'users.firstname as firstname', 'users.lastname as lastname')
            ->get();

        return response()->json($result, 200);
    }
}
