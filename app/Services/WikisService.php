<?php

namespace App\Services;

//use App\Http\Requests\WikiRequest;
//use App\Models\Project;
//use App\Models\Wiki;
//use App\Models\WikiContent;
//use App\Models\WikiPage;
//use Auth;
use App\Models\Wiki;
use App\Models\WikiPage;

class WikisService
{

    public function startPage($identifier)
    {
        return Wiki::query()->whereHas('project', function ($query) use ($identifier) {
            /** @var $query Builder */
            $query->where('identifier', $identifier);
        })->first();
    }

    public function one($identifier, $name = null)
    {
        return WikiPage::query()
            ->with([
                'wiki',
                'content.author'
            ])
            ->where(
                'title',
                $name ?? (($page = $this->startPage($identifier)) ? $page->start_page : 'Wiki')
            )
            ->whereHas('wiki.project', function ($query) use ($identifier) {
                /** @var $query Builder */
                $query->where('identifier', $identifier);
            })
            ->first();
    }

//    protected $projectsService;

//    public function __construct(ProjectsService $projectsService)
//    {
//        $this->projectsService = $projectsService;
//    }
//
//    public function getWikiPageMarkDown($identifier, $page_title = null)
//    {
//        $project = $this->projectsService->one($identifier);
//
//        $wiki_content = $project->wiki
//            ->page()
//            ->with('content');
//
//        if ($page_title) {
//            $wiki_content->where('title', $page_title);
//        } else {
//            $wiki_content
//                ->where('parent_id', null)
//                ->orderBy('created_on', 'asc');
//        }
//
//        return $wiki_content->first();
//
//    }
//
//    public function setWikiPageMarkDown($request, $identifier, $wiki_id, $name = null)
//    {
//        $project = $this->projectsService->one($identifier);
//        $wiki_page = $project->wiki->page();
//
//        if ($name) {
//            $name = str_replace(' ', '_', $name);
//            $wiki_page->where('title', $wiki_id);
//            $wiki_id = $name;
//        } else {
//            $wiki_page->where('id', $wiki_id);
//        }
//
//        $wiki_page = $wiki_page
//            ->with(['content' => function ($q) use ($wiki_id) {
//                $q->where('id', $wiki_id);
//            }])
//            ->firstOrFail();
//
//        $wiki_page->update(['title' => array_get($request, 'title')]);
//        $wiki_page->title = str_replace(' ', '_', array_get($request, 'title'));
//        $wiki_page->parent_id = array_get($request, 'parent_id') == 'null' ? null : array_get($request, 'parent_id');
//        $wiki_page->save();
//        $wiki_page->content()->update($request['content']);
//        return $wiki_page;
//    }
//
//    public function addNewWiki($request, $identifier)
//    {
//        $project = $this->projectsService->one($identifier);
//        $wiki = $project->wiki;
//
//        $new_page = $wiki->page()->create([
//            'title' => str_replace(' ', '_', array_get($request, 'title')),
//            'parent_id' => array_get($request, 'parent_id'),
//        ]);
//
//
//        $new_page_content = $new_page->content()->create([
//            'author_id' => Auth::user()->id,
//            'text' => array_get($request, 'text'),
//            'version' => 1
//        ]);
//
//        return response()->json(array_merge($new_page_content->toArray(), ['title' => $new_page->title]), 201);
//    }
//
//    public function deleteWikiPage($identifier, $title)
//    {
//        $success = false;
//        $message = '';
//        $project = $this->projectsService->one($identifier);
//        $wiki = $project->wiki;
//        $delete_page = $wiki->page()->where('title', $title)->firstOrFail();
//        try {
//            $success = $delete_page->delete();
//
//        } catch (Exception $e) {
//            $message = $e->getMessage();
//        }
//
//
//        return response()->json(['success' => $success, 'message' => $message], 200);
//
//    }
//
//    public function getAllWikiPage($identifier)
//    {
//        $project = $this->projectsService->one($identifier);
//        return $project->wiki->page()->with('content')->get();
//    }
//
//    public function update($wikiId, $data)
//    {
//        return Wiki::where(['id' => $wikiId])->update($data);
//    }
}