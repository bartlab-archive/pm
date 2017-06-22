<?php

namespace App\Services;

use App\Models\Issue;

class IssuesService
{
//	public function all($request)
//	{
//		$user = User::userByHeaderAuthToken($request);
//		$total = 0;
//
//		if($user->admin)
//		{
//			$query = Issue::join('users', 'issues.assigned_to_id', '=', 'users.id')
//				->select('issues.*', 'users.firstname as firstname', 'users.lastname as lastname', DB::raw('CONCAT(firstname, " ", lastname) AS full_name'))
//				->offset($request->offset)
//				->limit($request->limit);
//			$total = $total = Issue::all()->count();
//		} else {
//			$query = Issue::where('assigned_to_id', $user->id)->join('users', 'issues.assigned_to_id', '=', 'users.id')
//				->select('issues.*', 'users.firstname as firstname', 'users.lastname as lastname', DB::raw('CONCAT(firstname, " ", lastname) AS full_name'))
//				->offset($request->offset)
//				->limit($request->limit);
//			$total = Issue::where('assigned_to_id', $user->id)->count();
//		}
//
//		if(!empty($request->sortField))
//		{
//			$query->orderBy($request->sortField, $request->order);
//		}
//
//		return ['result' => $query->get(), 'total' => $total];
//	}
	
	public function one($id)
	{
		return Issue::where('id', $id)
			->with(['trackers'])->first();
	}
}