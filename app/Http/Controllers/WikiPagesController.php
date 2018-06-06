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

        /*
         * todo: check project and permissions
         */
        return WikiPageResource::collection(
            $this->wikisService->allPages($project->id)
        );
    }

    public function show($identifier, $name)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        /*
         * todo: check project and permissions
         */
        return WikiPageResource::make(
            $this->wikisService->onePageByName($project->id, $name, true)
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

        $wiki = $this->wikisService->createPage(
            array_merge(
                $request->validated(),
                [
                    'author_id' => \Auth::id(),
                    'project_id' => $project->id
                ]
            )
        );

        if (!$wiki) {
            abort(422);
        }

        return WikiPageResource::make($wiki);
    }

    public function update($identifier, $id, UpdateWikiPageRequest $request)
    {
        /*
         * todo: check permissions
         */
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        $wiki = $this->wikisService->updatePage(
            $id,
            array_merge(
                $request->validated(),
                [
                    'author_id' => \Auth::id(),
                ]
            )
        );

        if (!$wiki) {
            abort(422);
        }

        return WikiPageResource::make($wiki);
    }

    public function destroy($identifier, $id)
    {
    }

    public function watch($identifier, $id)
    {
        if (!$this->projectsService->one($identifier) || !$this->wikisService->onePageById($id)) {
            return abort(404);
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
        if (!$this->projectsService->one($identifier) || !$this->wikisService->onePageById($id)) {
            return abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->wikisService->unwatchPage($id, \Auth::id())) {
            return abort(422);
        }

        return response(null, 204);
    }

    public function lock($identifier, $id)
    {
        if (!$this->projectsService->one($identifier) || !$this->wikisService->onePageById($id)) {
            return abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->wikisService->lockPage($id)) {
            return abort(422);
        }

        return response(null, 204);
    }

    public function unlock($identifier, $id)
    {
        if (!$this->projectsService->one($identifier) || !$this->wikisService->onePageById($id)) {
            return abort(404);
        }

        /*
         * todo:
         * Need check:
         *  - is module enambled for project
         *  - is user allow to view issue
         *  - project status
         */
        if (!$this->wikisService->unlockPage($id)) {
            return abort(422);
        }

        return response(null, 204);
    }
}