<?php

namespace App\Services;

use App\Models\GroupsUser;

class GroupsUsersService
{
	public function all()
	{
		return GroupsUser::all();
	}

	public function getList()
	{
		return GroupsUser::all();
	}

	public function one($id)
	{
		return GroupsUser::where('group_id', $id)->first();
	}

	public function update($id, $data){
		return GroupsUser::where(['group_id' => $id])->first()->update($data);
	}

	public function create($data){
		//$data['group_id'] =
		$group = GroupsUser::create($data);

		return $group;
	}

	public function delete($id)
	{
		$group = GroupsUser::where('group_id', $id)->firstOrFail();

		return $group->delete();
	}
}