<?php

namespace App\Http\Controllers;

use App\Http\Requests\Wiki\WikiRequest;
use App\Http\Resources\WikiResource;
use App\Services\WikisService;
use App\Services\ProjectsService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class WikisController
 *
 * @property WikisService $wikisService
 * @property ProjectsService $projectsService
 *
 * @package App\Http\Controllers
 */
class WikisController extends BaseController
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

    public function show($identifier)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        return WikiResource::make(
            $this->wikisService->oneWikiByProjectId($project->id, [], true)
        );
    }

    public function store($identifier, WikiRequest $request)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        return WikiResource::make(
            $this->wikisService->createWiki(
                array_merge(
                    $request->validated(),
                    ['project_id' => $project->id])
            )
        );
    }

    public function update($identifier, WikiRequest $request)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

//        if (!$this->wikisService->oneWikiByProjectId($project->id)) {
//            abort(404);
//        }

        if (!$wiki = $this->wikisService->updateWiki($project->id, $request->validated())) {
            abort(422);
        }

        return WikiResource::make($wiki);
    }
}