<?php



namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\News;
use App\Services\NewsService;
use App\Services\ProjectsService;
use Illuminate\Routing\Controller as BaseController;

class NewsController extends BaseController
{
	protected $newsService;
	protected $projectsService;
	
	public function __construct(NewsService $newsService, ProjectsService $projectsService)
	{
		$this->newsService = $newsService;
		$this->projectsService = $projectsService;
	}
	
	public function index()
	{
		return $this->newsService->all();
	}
	
	
	public function show($id)
	{
		if ($news = $this->newsService->one($id)) {
			return $news;
		}
		abort(404);
	}
	
	public function getProjectNews($project_identifier)
	{
		$id = $this->projectsService->one($project_identifier)->id;
		return $this->newsService->allByProjectId($id);
	}
	
}
