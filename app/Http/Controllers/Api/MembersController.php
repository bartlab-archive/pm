<?php

namespace App\Http\Controllers\Api;

use App\Services\MemberRolesService;
use App\Services\MembersService;
use App\Services\ProjectsService;
use App\Services\RolesService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class MembersController
 *
 * @property ProjectsService $projectsService
 * @property MembersService $membersService
 *
 * @package App\Http\Controllers\Projects
 */
class MembersController extends BaseController
{

    protected $projectsService;
    protected $membersService;
    protected $memberRolesService;
    protected $rolesService;

    public function __construct(
        MemberRolesService $memberRolesService,
        RolesService $rolesService,
        ProjectsService $projectsService,
        MembersService $membersService
    )
    {
        $this->projectsService = $projectsService;
        $this->membersService = $membersService;
        $this->memberRolesService = $memberRolesService;
        $this->rolesService = $rolesService;
    }

    public function store(Request $request)
    {
        if (!$project = $this->projectsService->oneByIdentifier($request->get('identifier'))) {
            abort(404);
        }

        $roles = $request->get('roles');

        foreach ($roles as $roleId) {
            if (!$this->rolesService->one($roleId)) {
                abort(404);
            }
        }

        if (!$member = $this->membersService->create($project->id, $request->get('user'))) {
            abort(422);
        }

        $this->memberRolesService->create($member->id, $roles);

        response(null, 204);
    }

    public function update($id, Request $request)
    {
        if (!$member = $this->membersService->one($id)) {
            abort(404);
        }

        $roles = $request->get('roles');

        foreach ($roles as $roleId) {
            if (!$this->rolesService->one($roleId)) {
                abort(404);
            }
        }

        $this->memberRolesService->update($member->id, $roles);

        response(null, 204);
    }

    public function destroy($id)
    {
        if (!$member = $this->membersService->one($id)) {
            abort(404);
        }

        $this->memberRolesService->destroy($member->id);
        $this->membersService->destroy($id);

        response(null, 204);
    }
}