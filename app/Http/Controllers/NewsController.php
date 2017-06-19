<?php
/**
 * Created by PhpStorm.
 * User: tolik
 * Date: 19.06.17
 * Time: 17:27
 */


namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

class NewsController extends Controller
{
	public function getNews()
	{
		return News::all();
	}
	
	public function getOneNews($id)
	{
		return News::findOrFail($id);
	}
	
}