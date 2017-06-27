<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class NewsTest extends TestCase
{
	use WithoutMiddleware;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
    	$response = $this->get('/api/v1/news');
//    	dd($response->getContent());
		$response->assertJsonStructure([
				'*' => [
					'id', 'project_id', 'title', 'summary', 'description', 'created_on', 'comments_count', 'author_id'
				]
				]);
	}
	
	public function testExample2()
	{
		$response = $this->get('/api/v1/news/1');
		$response->assertJsonStructure([
				'id', 'project_id', 'title', 'summary', 'description', 'created_on', 'comments_count', 'author_id'
			]);
		
	}
	public function testExample3()
	{
		$response = $this->get('/api/v1/projects/brombrom/news');
		$response->assertJsonStructure([
			'*' => [
				'id', 'project_id', 'title', 'summary', 'description', 'created_on', 'comments_count', 'author_id'
			]
		]);
		
	}
	
    
}
