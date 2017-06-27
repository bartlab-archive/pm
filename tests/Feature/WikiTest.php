<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\WikiContent;
use App\Models\WikiPage;
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
        $this->be(User::first());

        $response = $this->json('GET','api/v1/projects/tdts/wiki');
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                    'author_id' ,
                    'comments',
                    'id',
                    'page_id',
                    'text',
                    'title',
                    'updated_on',
                    'version'
                ]);
    }

    public function testGetPageWikiMarkdownWithoutAuth()
    {
        $response = $this->json('GET','api/v1/projects/tdts/wiki/');
        $response->assertStatus(401);
    }

    public function testAddNewPageWiki()
    {
        $this->be(User::first());

        $response = $this->json('POST','api/v1/projects/tdts/new-page', ['text' => 'test text wiki page', 'title' => 'test_title_wiki_page']);
        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'author_id' ,
                'id',
                'page_id',
                'text',
                'title',
                'updated_on',
                'version'
            ]);


    }

    public function testAddNewPageWikiWithoutAuth()
    {
        $response = $this->json('POST','api/v1/projects/tdts/new-page', ['text' => 'test text wiki page', 'title' => 'test title wiki page']);
        $response->assertStatus(401);
    }

    public function testSetPageWikiMarkdown()
    {
        $this->be(User::first());

        $title = WikiPage::all()->last()->title;

        $id = WikiContent::all()->last()->id;

        $response = $this->call('PUT','api/v1/projects/tdts/wiki/'.$title.'/'.$id, ['text' => 'test text wiki page update']);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'author_id' ,
                'id',
                'page_id',
                'text',
                'title',
                'updated_on',
                'version'
            ]);
    }

    public function testSetPageWikiMarkdownWithoutAuth()
    {
        $title = WikiPage::all()->last()->title;

        $id = WikiContent::all()->last()->id;

        $response = $this->call('PUT','api/v1/projects/tdts/wiki/'.$title.'/'.$id, ['text' => 'test text wiki page update']);

        $response
            ->assertStatus(401);
    }


}
