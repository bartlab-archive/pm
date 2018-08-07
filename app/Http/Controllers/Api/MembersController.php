<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Projects\StoreMemberRequest;
use App\Http\Requests\Projects\UpdateMemberRequest;
use App\Services\ProjectsService;
use App\Services\RolesService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class MembersController
 *
 * @property RolesService $rolesService
 * @property ProjectsService $projectsService
 *
 * @package App\Http\Controllers\Projects
 */
class MembersController extends BaseController
{

    protected $projectsService;
    protected $rolesService;

    public function __construct(
        RolesService $rolesService,
        ProjectsService $projectsService
    )
    {
        $this->projectsService = $projectsService;
        $this->rolesService = $rolesService;
    }

    public function store(StoreMemberRequest $request)
    {
        // todo: check project access
        if (!$project = $this->projectsService->oneByIdentifier($request->get('identifier'))) {
            abort(404);
        }

        if (!$member = $this->projectsService->createMember($project->id, $request->get('user'), $request->get('roles'))) {
            abort(422);
        }

        response(null, 204);
    }

    public function update($id, UpdateMemberRequest $request)
    {
        // todo: check project access
        if (!$member = $this->projectsService->member($id)) {
            abort(404);
        }

        if (!$this->projectsService->updateMember($member->id, $request->get('roles'))) {
            abort(422);
        }

        response(null, 204);
    }

    public function destroy($id)
    {
        // todo: check project access
        if (!$member = $this->projectsService->member($id)) {
            abort(404);
        }

        if (!$this->projectsService->removeMember($id)) {
            abort(422);
        }

        response(null, 204);
    }
}