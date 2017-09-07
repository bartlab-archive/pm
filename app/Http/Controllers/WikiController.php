<?php

namespace App\Http\Controllers;


use App\Http\Requests\WikiRequest;
use App\Http\Requests\WikiUpdateRequest;
use App\Services\WikiService;
use Illuminate\Routing\Controller as BaseController;

class WikiController extends BaseController
{
    protected $WikiService;

    function __construct(WikiService $wikiService)
    {
        $this->WikiService = $wikiService;
    }

    public function getWikiPageMarkDown($identifier, $page_title = null)
    {

        return $this->WikiService->getWikiPageMarkDown($identifier, $page_title);
    }

    public function setWikiPageMarkDown(WikiUpdateRequest $request, $project_identifier, $wiki_id, $name = null)
    {
        return $this->WikiService->setWikiPageMarkDown($request->all(), $project_identifier, $wiki_id, $name);
    }

    public function addNewWiki(WikiRequest $request, $project_identifier)
    {
        return $this->WikiService->addNewWiki($request->all(), $project_identifier);
    }

    public function deleteWikiPage($identifier, $page_title){

        return $this->WikiService->deleteWikiPage($identifier, $page_title);
    }

    public function getAllWikiPage($project_identifier)
    {
        return $this->WikiService->getAllWikiPage($project_identifier);
    }




}