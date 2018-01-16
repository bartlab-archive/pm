<?php

namespace App\Services;

use App\Models\Group;

class GroupsService
{
	public function all()
	{
		return Group::all();
	}

	public function getList()
	{
		return Group::all();
	}

	public function one($id)
	{
		return Group::where('id', $id)->first();
	}

	public function update($id, $data){
		return Group::where(['id' => $id])->first()->update($data);
	}

	public function create($data)
	{
		return Group::create($data);
	}

	public function delete($id)
	{
		$group = Group::where('id', $id)->firstOrFail();
		return $group->delete();
	}
}