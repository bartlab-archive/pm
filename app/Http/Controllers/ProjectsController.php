<?php

namespace App\Http\Controllers;

use App\Http\Requests\Projects\IndexProjectRequest;
use App\Http\Requests\Projects\StoreProjectRequest;
use App\Http\Requests\Projects\UpdateProjectRequest;
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
        if ($request->input('my')) {
            return ProjectResource::collection(
                $this->projectsService->allByUserId(\Auth::id(), ['trackers', 'members.user'])
            );
        }

        return ProjectResource::collection(
            $this->projectsService->all(
                array_merge(
                    $request->validated(),
                    [
                        'with' => ['trackers', 'members.user']
                    ],
                    \Auth::admin() ? [] : [
                        'user_id' => \Auth::id()
                    ]
                )
            )
        );
    }

    public function show($identifier)
    {
        if (!$project = $this->projectsService->oneByIdentifier($identifier, [
            'parent',
            'members.user',
            'members.roles'
        ])) {
            abort(404);
        }

        // show modules only for admin and members
        if (\Auth::admin() || $project->members->firstWhere('user_id', \Auth::id())) {
            $project->load('enabledModules');
        }

        // todo: check project status
        return ProjectResource::make($project);
    }

    public function store(StoreProjectRequest $request)
    {
        $parent = $this->projectsService->oneByIdentifier($request->input('parent_identifier'));

        /*
         * todo: check parent project status and user roles
         */
        $project = $this->projectsService->create(
            array_merge(
                $request->validated(),
                ['parent_id' => $parent ? $parent->id : null]
            )
        );

        if (!$project) {
            // todo: add error message
            return abort(422);
        }

        return ProjectResource::make($project);
    }

    public function update($identifier, UpdateProjectRequest $request)
    {
        if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
            abort(404);
        }

        $parent = $this->projectsService->oneByIdentifier($request->input('parent_identifier'));

        /*
         * todo: check parent project status and user roles
         * todo: check updated project for status and user roles
         */

        $result = $this->projectsService->update(
            $project->id,
            array_merge(
                $request->validated(),
                ['parent_id' => $parent ? $parent->id : null]
            )
        );

        if (!$result) {
            // todo: add error message
            return abort(422);
        }

        return ProjectResource::make($result);
    }
}