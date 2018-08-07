<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Projects\IndexProjectRequest;
use App\Http\Requests\Projects\StoreProjectRequest;
use App\Http\Requests\Projects\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Services\EnabledModulesService;
use App\Services\ProjectsService;
use App\Services\UsersService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class ProjectController
 *
 * @property ProjectsService $projectsService
 * @property EnabledModulesService $enabledModulesService
 * @property UsersService $usersService
 *
 * @package App\Http\Controllers\Projects
 */
class ProjectsController extends BaseController
{

    protected $projectsService;
    protected $enabledModulesService;
    protected $usersService;

    public function __construct(
        ProjectsService $projectsService,
        EnabledModulesService $enabledModulesService,
        UsersService $usersService
    )
    {
        $this->projectsService = $projectsService;
        $this->enabledModulesService = $enabledModulesService;
        $this->usersService = $usersService;
    }

    public function index(IndexProjectRequest $request)
    {
        $userIds = $this->usersService->memberIds(\Auth::id());

        if ($request->input('my')) {
            return ProjectResource::collection(
                $this->projectsService->allByUserId($userIds, ['members.user']));
        }

        return ProjectResource::collection(
            $this->projectsService->all(
                array_merge(
                    $request->validated(),
                    [
                        'with' => ['members.user', 'enabledModules']
                    ],
                    \Auth::admin() ? [] : [
                        'user_ids' => $userIds
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
            'members.roles',
            'enabledModules'
        ])) {
            abort(404);
        }

        // check project status
        if ($project->isArchived()) {
            abort(403, 'The project you\'re trying to access has been archived.');
        }

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