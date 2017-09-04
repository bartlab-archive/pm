<?php

namespace App\Http\Controllers;

use App\Http\Requests\Projects\CreateProjectRequest;
use App\Http\Requests\Projects\IndexProjectRequest;
use App\Http\Requests\Projects\ProjectExistsRequest;
use App\Http\Requests\Projects\UpdateProjectRequest;
use App\Services\EnabledModulesService;
use App\Services\IssueCategoriesService;
use App\Services\IssuesService;
use App\Services\MemberRolesService;
use App\Services\MembersService;
use App\Services\ProjectsService;
use App\Services\VersionsService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class ProjectController
 *
 * @property ProjectsService $projectsService
 * @property MembersService $membersService
 * @property IssuesService $issuesService
 * @property EnabledModulesService $enabledModulesService
 * @property MemberRolesService $memberRolesService
 * @property VersionsService $versionsService
 * @property IssueCategoriesService $issueCategoriesService
 *
 * @package App\Http\Controllers\Projects
 */
class ProjectsController extends BaseController
{

    protected $projectsService;
    protected $issuesService;
    protected $enabledModulesService;
    protected $membersService;
    protected $memberRolesService;
    protected $versionsService;
    protected $issueCategoriesService;

    public function __construct(
        ProjectsService $projectsService,
        IssuesService $issuesService,
        EnabledModulesService $enabledModulesService,
        MembersService $membersService,
        MemberRolesService $memberRolesService,
        VersionsService $versionsService,
        IssueCategoriesService $issueCategoriesService
    )
    {
        $this->projectsService = $projectsService;
        $this->issuesService = $issuesService;
        $this->enabledModulesService = $enabledModulesService;
        $this->membersService = $membersService;
        $this->memberRolesService = $memberRolesService;
        $this->versionsService = $versionsService;
        $this->issueCategoriesService = $issueCategoriesService;
    }

    /**
     * @param IndexProjectRequest $request
     *
     * This method returns the all projects information
     * @example Response $response [
     *     {
     *         "id": 2,
     *         "name": "VR",
     *         "description": "Web platform for managing virtual reality mobile apps",
     *         "homepage": "",
     *         "is_public": 1,
     *         "parent_id": null,
     *         "created_on": "2016-07-12 11:26:37",
     *         "updated_on": "2016-07-12 11:26:37",
     *         "identifier": "vr",
     *         "status": 1,
     *         "lft": 75,
     *         "rgt": 76,
     *         "inherit_members": 0,
     *         "default_version_id": null
     *     },
     *     {
     *         "id": 34,
     *         "name": "BromBrom avtalTid",
     *         "description": "",
     *         "homepage": "",
     *         "is_public": 1,
     *         "parent_id": null,
     *         "created_on": "2017-03-08 13:55:48",
     *         "updated_on": "2017-03-27 11:55:09",
     *         "identifier": "brombrom",
     *         "status": 1,
     *         "lft": 7,
     *         "rgt": 8,
     *         "inherit_members": 0,
     *         "default_version_id": null,
     *         ""
     *     },
     *     ...
     * ]
     *
     * @return mixed
     */
    public function index(IndexProjectRequest $request)
    {
        return $this->projectsService->all($request->closed);
    }

    /**
     * Show
     *
     * This method returns the project information
     *
     * @example Response $response {
     *     "id": 2,
     *     "name": "VR",
     *     "description": "Web platform for managing virtual reality mobile apps",
     *     "homepage": "",
     *     "is_public": 1,
     *     "parent_id": null,
     *     "created_on": "2016-07-12 11:26:37",
     *     "updated_on": "2016-07-12 11:26:37",
     *     "identifier": "vr",
     *     "status": 1,
     *     "lft": 75,
     *     "rgt": 76,
     *     "inherit_members": 0,
     *     "default_version_id": null
     * }
     * @param $identifier
     * @return mixed
     */
    public function show($identifier)
    {
        if ($project = $this->projectsService->one($identifier)) {
            return $project;
        }
        abort(404);
    }

    /**
     * @param CreateProjectRequest $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function create(CreateProjectRequest $request)
    {
        return response($this->projectsService->create($request), 201);
    }

    /**
     * @param UpdateProjectRequest $request
     * @param $identifier
     * @return mixed
     */
    public function update(UpdateProjectRequest $request, $identifier)
    {
        return $this->projectsService->update($identifier, $request->all());
    }

    /**
     * Destroy
     *
     * This method deletes the project and relationships
     *
     * @param $identifier
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function destroy($identifier)
    {
        $this->projectsService->delete($identifier);
        return response(null, 204);
    }

//    public function getIssues($identifier, Request $request)
//    {
//    	$result = $this->projectsService->getIssues($identifier, $request);
//
//    	return response()->json($result['projects'])->header('X-Total', $result['total']);
//    }

    public function getProjectTrackers($identifier)
    {

        $result = $this->issuesService->trackers($identifier);

        return response()->json($result, 200);
    }

    /**
     * @param $identifier
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProjectModules($identifier, Request $request)
    {
        $result = $this->enabledModulesService->update([
            'identifier' => $identifier,
            'enabled_module_names' => $request->all()
        ]);

        return response()->json($result, 200);
    }

    /**
     * @param $identifier
     * @param UpdateProjectRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProjectInformation($identifier, UpdateProjectRequest $request)
    {
        $this->projectsService->update($identifier, $request->all());

        return response()->json(true, 200);
    }

    /**
     * @param int $memberId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteMember($memberId)
    {
        $result = $this->membersService->deleteById($memberId);
        return response()->json($result, 200);
    }

    /**
     * @param $memberId
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateMember($memberId, Request $request)
    {
        $result = $this->memberRolesService->update([
            'member_id' => $memberId,
            'role_id' => $request->role_id
        ]);

        return response()->json($result, 200);
    }

    /**
     * @param $identifier
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createMember($identifier, Request $request)
    {
        if (!($memberId = $this->membersService->create($identifier, $request->member))) {
            return response()->json(false, 200);
        }

        $result = $this->memberRolesService->create([
            'member_id' => $memberId,
            'role_id' => $request->role['role_id']
        ]);

        return response()->json($result, 200);
    }

    /**
     * @param $identifier
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createVersion($identifier, Request $request)
    {
        $result = $this->versionsService->create($identifier, $request->all());

        return response()->json($result, 200);
    }

    /**
     * @param int $versionId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteVersion($versionId)
    {
        $result = $this->versionsService->deleteById($versionId);
        return response()->json($result, 200);
    }

    /**
     * @param $versionId
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateVersion($versionId, Request $request)
    {
        $result = $this->versionsService->update($versionId, $request->all());
        return response()->json($result, 200);
    }

    public function closeCompletedVersion($identifier){
        $result = $this->versionsService->closeCompleted($identifier);
        return response()->json($result, 200);
    }

    /**
     * @param $identifier
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createIssueCategory($identifier, Request $request)
    {
        $result = $this->issueCategoriesService->create($identifier, $request->all());

        return response()->json($result, 200);
    }

    /**
     * @param int $issueCategoryId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteIssueCategory($issueCategoryId)
    {
        dd(111);
        $result = $this->issueCategoriesService->deleteById($issueCategoryId);
        return response()->json($result, 200);
    }

    /**
     * @param $issueCategoryId
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateIssueCategory($issueCategoryId, Request $request)
    {
        $result = $this->issueCategoriesService->update($issueCategoryId, $request->all());
        return response()->json($result, 200);
    }
}