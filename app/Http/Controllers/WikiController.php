<?php

namespace App\Http\Controllers;
use App\Http\Requests\WikiRequest;
use App\Services\WikiService;

class WikiController
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

    public function setWikiPageMarkDown(WikiRequest $request, $project_identifier, $wiki_id, $name = null)
    {
        return $this->WikiService->setWikiPageMarkDown($request, $project_identifier, $wiki_id, $name);
    }

    public function addNewWiki(WikiRequest $request, $project_identifier)
    {
        return $this->WikiService->addNewWiki($request, $project_identifier);
    }

    public function getAllWikiPage($project_identifier)
    {
        return $this->WikiService->getAllWikiPage($project_identifier);
    }




}