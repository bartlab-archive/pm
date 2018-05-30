<?php

namespace App\Http\Controllers;

use App\Http\Requests\WikiPage\CreateWikiPageRequest;
use App\Http\Requests\Wiki\CreateWikiRequest;
use App\Http\Resources\WikiPageResource;
use App\Http\Resources\WikiResource;
use App\Services\WikisService;
use App\Services\ProjectsService;
use Illuminate\Routing\Controller as BaseController;

class WikisController extends BaseController
{
    protected $wikisService;

    public function __construct(
        WikisService $wikisService,
        ProjectsService $projectsService
    )
    {
        $this->wikisService = $wikisService;
        $this->projectsService = $projectsService;
    }

    public function index($identifier)
    {
        /*
         * todo: check project and permissions
         */
        return WikiPageResource::collection(
            $this->wikisService->all($identifier)
        );
    }

    public function show($identifier, $name = null)
    {
        /*
         * todo: check project and permissions
         */

        if (!$wiki = $this->wikisService->one($identifier, $name)) {
            return response(null, 204);
        }

        return WikiPageResource::make($wiki);
    }

    public function store($identifier, CreateWikiPageRequest $request)
    {
        /*
         * todo: check permissions
         */

        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        $wiki = $this->wikisService->createPage(
            $identifier,
            array_merge(
                $request->validated(),
                [
                    'author_id' => \Auth::id()
                ]
            )
        );

        if (!$wiki) {
            abort(422);
        }

        return WikiPageResource::make($wiki);
    }

    public function update($identifier, $name)
    {
    }

    public function destroy($identifier, $name)
    {
    }

    public function watch($identifier, $name)
    {
    }

    public function unwatch($identifier, $name)
    {
    }

    public function lock($identifier, $name)
    {
    }

    public function unlock($identifier, $name)
    {
    }

    public function showStart($identifier)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        if (!$wiki = $this->wikisService->oneWiki($project->id, ['project'])) {
            abort(204);
        }

        return WikiResource::make($wiki);
    }

    public function storeStart($identifier, CreateWikiRequest $request)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        return  WikiResource::make(
            $this->wikisService->createWiki(
                $identifier,
                array_merge($request->validated(), ['project_id' => $project->id])
            )
        );
    }

    public function updateStart($identifier, CreateWikiRequest $request)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        if (!$wiki = $this->wikisService->oneWiki($project->id)) {
            abort(404);
        }

        return  WikiResource::make(
            $this->wikisService->updateWiki(
                $project->id,
                $request->validated(),
                ['project']
            )
        );
    }
//
//    public function getWikiPageMarkDown($identifier, $page_title = null)
//    {
//        return $this->WikiService->getWikiPageMarkDown($identifier, $page_title);
//    }
//
//    public function setWikiPageMarkDown(WikiUpdateRequest $request, $identifier, $wiki_id, $name = null)
//    {
//
//        return $this->WikiService->setWikiPageMarkDown($request->all(), $identifier, $wiki_id, $name);
//    }
//
//    public function addNewWiki(WikiRequest $request, $identifier)
//    {
//        return $this->WikiService->addNewWiki($request->all(), $identifier);
//    }
//
//    public function deleteWikiPage($identifier, $page_title){
//
//        return $this->WikiService->deleteWikiPage($identifier, $page_title);
//    }
//
//    public function getAllWikiPage($identifier)
//    {
//        return $this->WikiService->getAllWikiPage($identifier);
//    }
//    public function editWikiPage($identifier, $page_title )
//    {
//        return $this->WikiService->editWikiPage($identifier, $page_title);
//    }


}