<?php

namespace App\Http\Controllers;

use App\Http\Requests\Boards\BoardsRequest;
use App\Http\Requests\Enumerations\EnumerationsRequest;
use App\Http\Requests\IssueCategories\IssueCategoriesRequest;
use App\Http\Requests\Projects\CreateProjectRequest;
use App\Http\Requests\Projects\IndexProjectRequest;
use App\Http\Requests\Projects\UpdateProjectRequest;
use App\Http\Requests\Projects\UpdateProjectStatus;
use App\Http\Requests\Members\CreateMembersRequest;
use App\Http\Requests\MemberRoles\MemberRolesRequest;
use App\Http\Requests\Versions\VersionsRequest;
use App\Http\Requests\Wiki\WikiRequest;
use App\Services\BoardsService;
use App\Services\EnabledModulesService;
use App\Services\EnumerationsService;
use App\Services\IssueCategoriesService;
use App\Services\IssuesService;
use App\Services\MemberRolesService;
use App\Services\MembersService;
use App\Services\ProjectsService;
use App\Services\VersionsService;
use App\Services\WikiService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class ProjectController
 *
 * @property ProjectsService $projectsService
 * @property MembersService $membersService
 * @property EnabledModulesService $enabledModulesService
 * @property MemberRolesService $memberRolesService
 * @property VersionsService $versionsService
 * @property EnumerationsService $enumerationsService
 *
 * @package App\Http\Controllers\Projects
 */
class ProjectsController extends BaseController
{

    protected $projectsService;
//    protected $enabledModulesService;
//    protected $membersService;
//    protected $memberRolesService;
//    protected $versionsService;
//    protected $enumerationsService;

    public function __construct(
        ProjectsService $projectsService
//        EnabledModulesService $enabledModulesService,
//        MembersService $membersService,
//        MemberRolesService $memberRolesService,
//        VersionsService $versionsService,
//        EnumerationsService $enumerationsService
    )
    {
        $this->projectsService = $projectsService;
//        $this->enabledModulesService = $enabledModulesService;
//        $this->membersService = $membersService;
//        $this->memberRolesService = $memberRolesService;
//        $this->versionsService = $versionsService;
//        $this->enumerationsService = $enumerationsService;
    }

    public function index(IndexProjectRequest $request)
    {
        // todo: get only needed fields from request
        $data = $this->projectsService->all($request->all());

        return response()
            ->json($data['list'], 200)
            ->withHeaders([
                'X-Total' => $data['total'],
                'X-Limit' => $data['limit'],
                'X-Offset' => $data['offset'],
            ]);
    }

    public function show($identifier)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        // todo: check project status

        return response()->json($project, 200);
    }
//
//    public function create(CreateProjectRequest $request)
//    {
//        $project = $this->projectsService->create($request->all());
//        return response($project, 201);
//    }
//
//    public function update(UpdateProjectRequest $request, $identifier)
//    {
//        return $this->projectsService->update($identifier, $request->all());
//    }
//
//    public function destroy($identifier)
//    {
//        $this->projectsService->delete($identifier);
//        return response(null, 204);
//    }
//
//    public function updateProjectModules($identifier, Request $request)
//    {
//        $result = $this->enabledModulesService->massUpdate($identifier, $request->all());
//
//        return response()->json($result, 200);
//    }
//
//    public function updateProjectInformation($identifier, UpdateProjectRequest $request)
//    {
//        $this->projectsService->update($identifier, $request->all());
//
//        return response()->json(true, 200);
//    }
//
//    public function deleteMember($memberId)
//    {
//        if ($result = $this->membersService->deleteById($memberId)) {
//            $result = $this->memberRolesService->deleteByMemberId($memberId);
//        }
//
//        return response()->json($result, 200);
//    }
//
//    public function updateMember($memberId, MemberRolesRequest $request)
//    {
//        $result = $this->memberRolesService->update($memberId, $request->all());
//
//        return response()->json($result, 200);
//    }
//
//    public function createMember($identifier, CreateMembersRequest $request)
//    {
//        if (!($memberId = $this->membersService->create($identifier, ['user_id' => $request->user_id]))) {
//            return response()->json(false, 200);
//        }
//
//        $result = $this->memberRolesService->create([
//            'member_id' => $memberId,
//            'role_id' => $request->role_id
//        ]);
//
//        return response()->json($result, 200);
//    }
//
//    public function createVersion($identifier, VersionsRequest $request)
//    {
//        $result = $this->versionsService->create($identifier, $request->all());
//
//        return response()->json($result, 200);
//    }
//
//    public function deleteVersion($versionId)
//    {
//        $result = $this->versionsService->deleteById($versionId);
//        return response()->json($result, 200);
//    }
//
//    public function updateVersion($versionId, VersionsRequest $request)
//    {
//        $result = $this->versionsService->update($versionId, $request->all());
//        return response()->json($result, 200);
//    }
//
//    public function closeCompletedVersion($identifier)
//    {
//        $result = $this->versionsService->closeCompleted($identifier);
//        return response()->json($result, 200);
//    }
//
//    public function updateProjectStatus($identifier, UpdateProjectStatus $request)
//	{
//		$this->projectsService->update($identifier, $request->all());
//		return response()->json(true, 200);
//	}
//
//    /**
//     * @param $identifier
//     * @param EnumerationsRequest $request
//     * @return \Illuminate\Http\JsonResponse
//     */
//    public function createActivity($identifier, EnumerationsRequest $request)
//    {
//        $result = $this->enumerationsService->create($identifier, $request->all());
//
//        return response()->json($result, 200);
//    }
//
//    /**
//     * @param int $activityId
//     * @return \Illuminate\Http\JsonResponse
//     */
//    public function deleteActivity($activityId)
//    {
//        $result = $this->enumerationsService->deleteById($activityId);
//        return response()->json($result, 200);
//    }
//
//    /**
//     * @param $activityId
//     * @param EnumerationsRequest $request
//     * @return \Illuminate\Http\JsonResponse
//     */
//    public function updateActivity($activityId, EnumerationsRequest $request)
//    {
//        $result = $this->enumerationsService->update($activityId, $request->all());
//        return response()->json($result, 200);
//    }
//
//
//    public function getActivity($projectIdentifier, Request $request)
//    {
//        $data = $this->projectsService->getActivity($projectIdentifier, $request->all());
//
//        return response()->json(['data' => $data], 200);
//    }
}