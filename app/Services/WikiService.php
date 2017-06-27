<?php

namespace App\Services;

use App\Http\Requests\WikiRequest;
use App\Models\Project;
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

        $wiki_content = $wiki_content->first()->toArray();

        return response()->json(array_merge(is_null($wiki_content['content']) ? [] : $wiki_content['content'] , ['title' => $wiki_content['title']]));
    }

    public function setWikiPageMarkDown($request, $project_identifier, $wiki_id, $name = null)
    {
        $user_projects = Auth::user()->projects;
        $project = $user_projects->where('identifier', $project_identifier)->first();

        $wiki_content = $project->wiki->page();

        if ($name) {
            $wiki_content->where('title', $wiki_id);
            $wiki_id = $name;
        } else {
            $wiki_content->where('id', $wiki_id);
        }
        $wiki_content = $wiki_content
            ->with(['content' => function ($q) use ($wiki_id) {
                $q->where('id', $wiki_id);
            }])
            ->firstOrFail();
        $wiki_content->content->update([
            'text' => array_get($request, 'text')
        ]);



        $wiki_content = $wiki_content->toArray();

        return response()->json(array_merge($wiki_content['content'], ['title' => $wiki_content['title']]));
    }

    public function addNewWiki($request, $project_identifier)
    {
        $project = Auth::user()->projects()->where('identifier', $project_identifier)->firstOrFail();
        $wiki = $project->wiki;

        $new_page = $wiki->page()->create([
            'title' => array_get($request, 'title'),
            'parent_id' => $wiki->page->first()->id
        ]);

        $new_page_content = $new_page->content()->create([
            'author_id' => Auth::user()->id,
            'text' => array_get($request, 'text'),
            'version' => 1
        ]);

        return response()->json(array_merge($new_page_content->toArray(), ['title' => $new_page->title]), 201);
    }

    public function getAllWikiPage($project_identifier)
    {
        $project = Auth::user()->projects()->where('identifier', $project_identifier)->firstOrFail();

        $wiki = $project->wiki->page()->with('content')->get();

        return $wiki;
    }
}