<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class WikiTest extends TestCase
{


    public function testGetAllPageWiki()
    {
        $this->be(User::first());

        $response = $this->json('GET','api/v1/projects/tdts/wiki/all');
            $response
                ->assertStatus(200)
                ->assertJsonStructure([
                '*' => [
                    'content' ,
                    'created_on',
                    'id',
                    'parent_id',
                    'protected',
                    'title',
                    'wiki_id'
                ]
        ]);
    }

    public function testGetAllPageWikiWithoutAuth()
    {
        $response = $this->json('GET','api/v1/projects/tdts/wiki/all');
        $response->assertStatus(401);
    }

    public function testGetPageWikiMarkdown()
    {
//        $this->be(User::first());
//
//        $response = $this->json('GET','api/v1/projects/tdts/wiki');
//        $response
//            ->assertStatus(200)
//            ->assertJsonStructure([
//                '*' => [
//                    'author_id' ,
//                    'comments',
//                    'id',
//                    'page_id',
//                    'text',
//                    'title',
//                    'updated_on',
//                    'version'
//                ]
//            ]);
    }

    public function testGetPageWikiMarkdownWithoutAuth()
    {
        $response = $this->json('GET','api/v1/projects/tdts/wiki/');
        $response->assertStatus(401);
    }
}
