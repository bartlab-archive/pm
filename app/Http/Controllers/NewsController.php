<?php



namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\News;
use App\Services\NewsService;

class NewsController extends Controller
{
	protected $newsService;
	
	public function __construct(NewsService $newsService)
	{
		$this->newsService = $newsService;
	}
	
	public function index()
	{
		return $this->newsService->all();
	}
	
	
	public function show($identifier)
	{
		if ($news = $this->newsService->one($identifier)) {
			return $news;
		}
		abort(404);
	}
	
}
