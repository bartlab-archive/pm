<?php

namespace App\Http\Controllers;

use App\Http\Requests\WikiPage\CreateWikiPageRequest;
use App\Http\Requests\WikiPage\UpdateWikiPageRequest;
use App\Http\Resources\WikiPageResource;
use App\Services\WikisService;
use App\Services\ProjectsService;
use Illuminate\Routing\Controller as BaseController;

class WikiPagesController extends BaseController
{
    protected $wikisService;
    protected $projectsService;

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
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        if (!$wiki = $this->wikisService->oneWikiByProjectId($project->id)) {
            abort(404);
        }

        /*
         * todo: check project and permissions
         */
        return WikiPageResource::collection(
            $this->wikisService->allPages($wiki->id)
        );
    }

    public function show($identifier, $name)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        if (!$wiki = $this->wikisService->oneWikiByProjectId($project->id)) {
            abort(404);
        }

        /*
         * todo: check project and permissions
         */
        return WikiPageResource::make(
            $this->wikisService->onePageByName($wiki->id, $name, true)
        );
    }

    public function store($identifier, CreateWikiPageRequest $request)
    {
        /*
         * todo: check permissions
         */
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        if (!$wiki = $this->wikisService->oneWikiByProjectId($project->id)) {
            abort(404);
        }

        $page = $this->wikisService->createPage(
            $wiki->id,
            array_merge(
                $request->validated(),
                ['author_id' => \Auth::id()]
            )
        );

        if (!$page) {
            abort(422);
        }

        return WikiPageResource::make($page);
    }

    public function update($identifier, $id, UpdateWikiPageRequest $request)
    {
        /*
         * todo: check permissions
         */
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        if (!$this->wikisService->oneWikiByProjectId($project->id)) {
            abort(404);
        }

        $page = $this->wikisService->updatePage(
            $id,
            array_merge(
                $request->validated(),
                ['author_id' => \Auth::id()]
            )
        );

        if (!$page) {
            abort(422);
        }

        return WikiPageResource::make($page);
    }

    public function destroy($identifier, $id)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        if (!$this->wikisService->deletePage($id)) {
            abort(422);
        }

        return response(null, 204);
    }

    public function watch($identifier, $id)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        if (!$this->wikisService->oneWikiByProjectId($project->id)) {
            abort(404);
        }

        if (!$this->wikisService->onePageById($id)) {
            abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->wikisService->watchPage($id, \Auth::id())) {
            return abort(422);
        }

        return response(null, 204);
    }

    public function unwatch($identifier, $id)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        if (!$this->wikisService->oneWikiByProjectId($project->id)) {
            abort(404);
        }

        if (!$this->wikisService->onePageById($id)) {
            abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->wikisService->unwatchPage($id, \Auth::id())) {
            abort(422);
        }

        return response(null, 204);
    }

    public function lock($identifier, $id)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        if (!$this->wikisService->oneWikiByProjectId($project->id)) {
            abort(404);
        }

        if (!$this->wikisService->onePageById($id)) {
            abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->wikisService->lockPage($id)) {
            abort(422);
        }

        return response(null, 204);
    }

    public function unlock($identifier, $id)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        if (!$this->wikisService->oneWikiByProjectId($project->id)) {
            abort(404);
        }

        if (!$this->wikisService->onePageById($id)) {
            abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->wikisService->unlockPage($id)) {
            abort(422);
        }

        return response(null, 204);
    }
}