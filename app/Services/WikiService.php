<?php

namespace App\Services;

use App\Http\Requests\WikiRequest;
use App\Models\Project;
use App\Models\Wiki;
use App\Models\WikiContent;
use App\Models\WikiPage;
use Auth;

class WikiService
{
    public function getWikiPageMarkDown($identifier, $page_title = null)
    {
        $user_projects = Auth::user()->projects;

        $project = $user_projects->where('identifier', $identifier)->first();

        if (is_null($project)) {
            abort(403);
        }

        $wiki_content = $project->wiki
            ->page()
            ->with('content');

        if ($page_title) {
            $wiki_content->where('title', $page_title);
        } else {
            $wiki_content->where('parent_id', null);
        }
        return $wiki_content->first();

    }

    public function setWikiPageMarkDown($request, $identifier, $wiki_id, $name = null)
    {
        $user_projects = Auth::user()->projects;
        $project = $user_projects->where('identifier', $identifier)->first();
        $wiki_page = $project->wiki->page();

        if ($name) {
            $wiki_page->where('title', $wiki_id);
            $wiki_id = $name;
        } else {
            $wiki_page->where('id', $wiki_id);
        }

        $wiki_page = $wiki_page
            ->with(['content' => function ($q) use ($wiki_id) {
                $q->where('id', $wiki_id);
            }])
            ->firstOrFail();
        $wiki_page->update(['title' => array_get($request, 'title')]);
        $wiki_page->title = str_replace(' ','_',array_get($request, 'title'));
        $wiki_page->parent_id = array_get($request, 'parent_id') == 'null' ? null : array_get($request, 'parent_id') ;
        $wiki_page->save();
        $wiki_page->content()->update($request['content']);
          return $wiki_page;
    }

    public function addNewWiki($request, $project_identifier)
    {
        $project = Auth::user()->projects()->where('identifier', $project_identifier)->firstOrFail();
        $wiki = $project->wiki;

        $new_page = $wiki->page()->create([
            'title' => array_get($request, 'title'),
        ]);


        $new_page_content = $new_page->content()->create([
            'author_id' => Auth::user()->id,
            'text' => array_get($request, 'text'),
            'version' => 1
        ]);

        return response()->json(array_merge($new_page_content->toArray(), ['title' => $new_page->title]), 201);
    }

    public function deleteWikiPage($identifier, $title)
    {
        $success = false;
        $message = '';
        $project = Auth::user()->projects()->where('identifier', $identifier)->firstOrFail();
        $wiki = $project->wiki;
        $delete_page = $wiki->page()->where('title', $title)->firstOrFail();
        try
        {
            $success = $delete_page->delete();

        }
        catch (Exception $e)
        {
            $message = $e->getMessage();
        }


        return response()->json( ['success' => $success, 'message'=> $message], 200);

    }

    public function getAllWikiPage($project_identifier)
    {
        $project = Auth::user()->projects()->where('identifier', $project_identifier)->firstOrFail();

        $wiki = $project->wiki->page()->with('content')->get();

        return $wiki;
    }

    public function editWikiPage($identifier, $title)
    {
        var_dump($title);
    }

    public function update($wikiId, $data)
    {
        return Wiki::where(['id' => $wikiId])->update($data);
    }
}