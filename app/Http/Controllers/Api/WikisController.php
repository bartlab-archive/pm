<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Wiki\WikiRequest;
use App\Http\Resources\WikiResource;
use App\Services\EnabledModulesService;
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
    protected $enabledModulesService;

    public function __construct(
        WikisService $wikisService,
        ProjectsService $projectsService,
        EnabledModulesService $enabledModulesService
    )
    {
        $this->wikisService = $wikisService;
        $this->projectsService = $projectsService;
        $this->enabledModulesService = $enabledModulesService;
    }

    public function show($identifier)
    {
        if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
            abort(404);
        }

        if (!$this->enabledModulesService->check($project->id, $this->wikisService::MODULE_NAME)) {
            abort(403);
        }

        return WikiResource::make(
            $this->wikisService->oneWikiByProjectId($project->id, [], true)
        );
    }

    public function store($identifier, WikiRequest $request)
    {
        if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
            abort(404);
        }

        if (!$this->enabledModulesService->check($project->id, $this->wikisService::MODULE_NAME)) {
            abort(403);
        }

        if (!$wiki = $this->wikisService->createWiki($project->id, $request->validated())) {
            abort(422);
        }

        return WikiResource::make($wiki);
    }

    public function update($identifier, WikiRequest $request)
    {
        if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
            abort(404);
        }

        if (!$this->enabledModulesService->check($project->id, $this->wikisService::MODULE_NAME)) {
            abort(403);
        }

        if (!$wiki = $this->wikisService->updateWiki($project->id, $request->validated())) {
            abort(422);
        }

        return WikiResource::make($wiki);
    }

    public function destroy($identifier)
    {

    }
}