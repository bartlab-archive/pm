<?php

namespace App\Http\Controllers;

use App\Http\Requests\Wiki\CreateWikiRequest;
use App\Http\Resources\WikiPageResource;
use App\Services\WikisService;
use Illuminate\Routing\Controller as BaseController;

class WikisController extends BaseController
{
    protected $wikisService;

    public function __construct(WikisService $wikisService)
    {
        $this->wikisService = $wikisService;
    }

    public function index($identifier)
    {
        return WikiPageResource::collection(
            $this->wikisService->all($identifier)
        );
    }

    public function show($identifier, $name = null)
    {
        if (!$wiki = $this->wikisService->one($identifier, $name)) {
            return response(null, 204);
        }

        return WikiPageResource::make($wiki);
    }

    public function create($identifier, CreateWikiRequest $request)
    {
        $wiki = $this->wikisService->create(
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

    public function watch($identifier, $id)
    {
    }

    public function unwatch($identifier, $id)
    {
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