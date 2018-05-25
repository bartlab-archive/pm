<?php

namespace App\Http\Controllers;

use App\Http\Requests\Projects\IndexProjectRequest;
use App\Http\Requests\Projects\StoreProjectRequest;
use App\Http\Requests\Projects\UpdateProjectRequest;
use App\Http\Resources\MemberResource;
use App\Http\Resources\ModuleResource;
use App\Http\Resources\ProjectResource;
use App\Services\EnabledModulesService;
use App\Services\MembersService;
use App\Services\ProjectsService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class ProjectController
 *
 * @property ProjectsService $projectsService
 * @property MembersService $membersService
 * @property EnabledModulesService $enabledModulesService
 *
 * @package App\Http\Controllers\Projects
 */
class ProjectsController extends BaseController
{

    protected $projectsService;
    protected $enabledModulesService;
    protected $membersService;

    public function __construct(
        ProjectsService $projectsService,
        EnabledModulesService $enabledModulesService,
        MembersService $membersService
    )
    {
        $this->projectsService = $projectsService;
        $this->enabledModulesService = $enabledModulesService;
        $this->membersService = $membersService;
    }

    public function index(IndexProjectRequest $request)
    {
        return ProjectResource::collection(
            $this->projectsService->all(
                array_merge(
                    $request->only(['status', 'order', 'per_page', 'page']),
                    [
                        'with' => ['trackers','members.user']
                    ]
                )
            )
        );
    }

    public function show($identifier)
    {
        if (!$project = $this->projectsService->one($identifier, ['parent', 'members.user', 'members.roles', 'enabledModules'])) {
            abort(404);
        }

        // todo: check project status

        return ProjectResource::make($project);
//            ->additional([
//                'modules' => ModuleResource::collection(
//                    $this->enabledModulesService->getEnabledByProject($identifier)
//                ),
//                'members' => MemberResource::collection(
//                    $this->membersService->getByProject($identifier, ['user', 'roles'])
//                )
//            ]);
    }

    public function store(StoreProjectRequest $request)
    {
        return ProjectResource::make(
            $this->projectsService->create($request->validated())
        );
    }

    public function update(UpdateProjectRequest $request)
    {
//        if (!$this->projectsService->one($request->get('project_identifier'))) {
//            abort(404);
//        }


        return ProjectResource::make(
            $this->projectsService->update($request->validated())
        );
    }
}