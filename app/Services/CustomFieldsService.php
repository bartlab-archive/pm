<?php

namespace App\Services;

use App\Models\CustomField;

class CustomFieldsService
{
	public function all()
	{
		return CustomField::all();
	}

	public function getList()
	{
		return CustomField::all();
	}

	public function one($id)
	{
		return CustomField::where('id', $id)->first();
	}

	public function update($id, $data){
		return CustomField::where(['id' => $id])->first()->update($data);
	}

	public function create($data){
		$group = CustomField::create($data);
		return $group;
	}

	public function delete($id)
	{
		$group = CustomField::where('id', $id)->firstOrFail();

		return $group->delete();
	}
}