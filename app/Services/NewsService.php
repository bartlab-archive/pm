<?php
/**
 * Created by PhpStorm.
 * User: tolik
 * Date: 22.06.17
 * Time: 16:16
 */

namespace App\Services;

use App\Models\News;

class NewsService
{
	public function all()
	{
		return News::all();
	}
	
	public function one($id)
	{
		return News::find($id);
	}
	
	public function allByProjectId(int $id)
	{
		return News::where('project_id', $id)->get();
	}
	
}