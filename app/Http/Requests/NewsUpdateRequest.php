<?php
/**
 * Created by PhpStorm.
 * User: tolik
 * Date: 26.06.17
 * Time: 15:51
 */

namespace App\Http\Requests;
use App\Models\Project;
use App\Models\News;
use Illuminate\Foundation\Http\FormRequest;

class NewsUpdateRequest extends FormRequest
{
	public function authorize()
	{
		return true;
	}
	
	public function rules()
	{
		
		return [
			'author_id' => 'int|',
			'comments_count' => 'int' ,
			'description' => 'string',
			'project_id' => 'int|exists:' . Project::getTableName() . ',id',
			'summary' => 'string',
			'title' => 'string',
			'created_on' => '',
			'id' => 'int'
		];
	}
}
