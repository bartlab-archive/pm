<?php

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
	public function update($id, $data)
	{
		$news = News::find($id);
		$news->update($data);
		return $news;
	}
	
	
}