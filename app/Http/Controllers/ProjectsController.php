<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

class ProjectsController extends Controller
{
    public function getIssues($identifier, Request $request)
    {
        $query = Project::where('identifier', $identifier)->first()->issues()
            ->join('users', 'issues.assigned_to_id', '=', 'users.id')
            ->select('issues.*', 'users.firstname as firstname', 'users.lastname as lastname', DB::raw('CONCAT(firstname, " ", lastname) AS full_name'))
            ->offset($request->offset)
            ->limit($request->limit);
        if(!empty($request->sortField))
        {
            $query->orderBy($request->sortField, $request->order);
        }

        $request = $query->get();
        $total = Project::where('identifier', $identifier)->first()->issues()->count();
        return response()->json($request, 200)->header('X-Total', $total);
    }
}
