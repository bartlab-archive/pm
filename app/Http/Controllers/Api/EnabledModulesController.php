<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ModuleResource;
use App\Services\EnabledModulesService;
use App\Services\ProjectsService;
use Illuminate\Http\Request;

class EnabledModulesController extends Controller
{
    protected $enabledModulesService;
    protected $projectsService;

    public function __construct(
        EnabledModulesService $enabledModulesService,
        ProjectsService $projectsService
    )
    {
        $this->enabledModulesService = $enabledModulesService;
        $this->projectsService = $projectsService;
    }

    public function index()
    {
        return ModuleResource::collection(
            $this->enabledModulesService->availableList()
        );
    }

    public function update(Request $request, $identifier)
    {
        if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
            abort(404);
        }

        $this->enabledModulesService->update($project->id, $request->all());
        response(null, 204);
    }
}
