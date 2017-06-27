<?php

namespace app\Http\Requests\Issues;


use App\Models\User;
use App\Models\Project;
use App\Models\Tracker;

use Illuminate\Foundation\Http\FormRequest;

class UpdateIssueRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}
	
	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'assigned_to_id' => 'int|exists:' . User::getTableName() . ', id',
			'subject' => 'required|string',
			'description' => 'string',
			'priority_id' => 'int',
//			'is_private' => 'boolean',
			'project_id' => 'int|exists:' . Project::getTableName() . ',id',
			'tracker_id' => 'int|exists:' . Tracker::getTableName() . ',id'
		];
	}
}