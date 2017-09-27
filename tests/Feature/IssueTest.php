<?php

namespace Tests\Feature;

use App\Models\Issue;
use App\Models\Project;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class IssueTest extends TestCase
{
    public function testIssuesByProjectAuth()
    {
	    $this->be(User::first());
    	
    	$project = Project::first();
	    $response = $this->get('/api/v1/projects/' . $project->identifier . '/issues?limit=5&offset=0');
	    
	    $response->assertStatus(200)
		         ->assertHeader('X-Total', $value = null);
    }
	
	public function testIssuesByProjectNotAuth()
	{
		$project = Project::first();
		$response = $this->get('/api/v1/projects/' . $project->identifier . '/issues?limit=5&offset=0');
		
		$response->assertStatus(401);
	}
    
    public function testNotExistIssueAuth()
    {
	    $this->be(User::first());
	    
	    $response = $this->get('/api/v1/issues/'. $this->findNotExistId());
	
	    $response->assertStatus(404);
    }
	
	public function testNotExistIssueNotAuth()
	{
		$response = $this->get('/api/v1/issues/'. $this->findNotExistId());
		
		$response->assertStatus(401);
	}
	
    public function testGetIssueAuth()
    {
	    $this->be(User::first());
    	
    	$issue = Issue::first()->toArray();
    	
    	$response = $this->get('/api/v1/issues/'.$issue['id']);
    	
	    $response->assertJsonFragment($issue)
	             ->assertStatus(200);
	    
	    
    }
	
	public function testGetIssueNotAuth()
	{
		$issue = Issue::first()->toArray();
		
		$response = $this->get('/api/v1/issues/'.$issue['id']);
		
		$response->assertStatus(401);
		
		
	}
	
	public function findNotExistId()
	{
		$id = 1000000;
		
		while(is_null(Issue::where('id', $id))) {
			$id = $id * 2;
		}
		
		return $id;
	}
}
