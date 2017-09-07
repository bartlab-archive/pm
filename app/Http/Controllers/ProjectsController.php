<?php

namespace App\Http\Controllers;

use App\Http\Requests\Boards\BoardsRequest;
use App\Http\Requests\Enumerations\EnumerationsRequest;
use App\Http\Requests\IssueCategories\IssueCategoriesRequest;
use App\Http\Requests\Projects\CreateProjectRequest;
use App\Http\Requests\Projects\IndexProjectRequest;
use App\Http\Requests\Projects\UpdateProjectRequest;
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
 * @property IssuesService $issuesService
 * @property EnabledModulesService $enabledModulesService
 * @property MemberRolesService $memberRolesService
 * @property VersionsService $versionsService
 * @property IssueCategoriesService $issueCategoriesService
 * @property WikiService $wikiService
 * @property BoardsService $boardsService
 * @property EnumerationsService $enumerationsService
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
    protected $wikiService;
    protected $boardsService;
    protected $enumerationsService;

    /**
     * ProjectsController constructor.
     * @param ProjectsService $projectsService
     * @param IssuesService $issuesService
     * @param EnabledModulesService $enabledModulesService
     * @param MembersService $membersService
     * @param MemberRolesService $memberRolesService
     * @param VersionsService $versionsService
     * @param IssueCategoriesService $issueCategoriesService
     * @param WikiService $wikiService
     * @param BoardsService $boardsService
     * @param EnumerationsService $enumerationsService
     */
    public function __construct(
        ProjectsService $projectsService,
        IssuesService $issuesService,
        EnabledModulesService $enabledModulesService,
        MembersService $membersService,
        MemberRolesService $memberRolesService,
        VersionsService $versionsService,
        IssueCategoriesService $issueCategoriesService,
        WikiService $wikiService,
        BoardsService $boardsService,
        EnumerationsService $enumerationsService
    )
    {
        $this->projectsService = $projectsService;
        $this->issuesService = $issuesService;
        $this->enabledModulesService = $enabledModulesService;
        $this->membersService = $membersService;
        $this->memberRolesService = $memberRolesService;
        $this->versionsService = $versionsService;
        $this->issueCategoriesService = $issueCategoriesService;
        $this->wikiService = $wikiService;
        $this->boardsService = $boardsService;
        $this->enumerationsService = $enumerationsService;
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
        $project = $this->projectsService->create($request->all());
        return response($project, 201);
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
        $result = $this->enabledModulesService->massUpdate($identifier, $request->all());

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
        if ($result = $this->membersService->deleteById($memberId)) {
            $result = $this->memberRolesService->deleteByMemberId($memberId);
        }

        return response()->json($result, 200);
    }

    /**
     * @param $memberId
     * @param MemberRolesRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateMember($memberId, MemberRolesRequest $request)
    {
        $result = $this->memberRolesService->update($memberId, $request->all());

        return response()->json($result, 200);
    }

    /**
     * @param $identifier
     * @param CreateMembersRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createMember($identifier, CreateMembersRequest $request)
    {
        if (!($memberId = $this->membersService->create($identifier, ['user_id' => $request->user_id]))) {
            return response()->json(false, 200);
        }

        $result = $this->memberRolesService->create([
            'member_id' => $memberId,
            'role_id' => $request->role_id
        ]);

        return response()->json($result, 200);
    }

    /**
     * @param $identifier
     * @param VersionsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createVersion($identifier, VersionsRequest $request)
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
     * @param VersionsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateVersion($versionId, VersionsRequest $request)
    {
        $result = $this->versionsService->update($versionId, $request->all());
        return response()->json($result, 200);
    }

    public function closeCompletedVersion($identifier)
    {
        $result = $this->versionsService->closeCompleted($identifier);
        return response()->json($result, 200);
    }

    /**
     * @param $identifier
     * @param IssueCategoriesRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createIssueCategory($identifier, IssueCategoriesRequest $request)
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
        $result = $this->issueCategoriesService->deleteById($issueCategoryId);
        return response()->json($result, 200);
    }

    /**
     * @param $issueCategoryId
     * @param IssueCategoriesRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateIssueCategory($issueCategoryId, IssueCategoriesRequest $request)
    {
        $result = $this->issueCategoriesService->update($issueCategoryId, $request->all());
        return response()->json($result, 200);
    }

    /**
     * Update Project Wiki
     *
     * @param $wikiId
     * @param WikiRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateWiki($wikiId, WikiRequest $request)
    {
        $result = $this->wikiService->update($wikiId, $request->all());
        return response()->json($result, 200);
    }

    /**
     * @param $identifier
     * @param BoardsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createForum($identifier, BoardsRequest $request)
    {
        $result = $this->boardsService->create($identifier, $request->all());

        return response()->json($result, 200);
    }

    /**
     * @param int $forumId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteForum($forumId)
    {
        $result = $this->boardsService->deleteById($forumId);
        return response()->json($result, 200);
    }

    /**
     * @param $forumId
     * @param BoardsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateForum($forumId, BoardsRequest $request)
    {
        $result = $this->boardsService->update($forumId, $request->all());
        return response()->json($result, 200);
    }

    /**
     * @param $identifier
     * @param EnumerationsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createActivity($identifier, EnumerationsRequest $request)
    {
        $result = $this->enumerationsService->create($identifier, $request->all());

        return response()->json($result, 200);
    }

    /**
     * @param int $activityId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteActivity($activityId)
    {
        $result = $this->enumerationsService->deleteById($activityId);
        return response()->json($result, 200);
    }

    /**
     * @param $activityId
     * @param EnumerationsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateActivity($activityId, EnumerationsRequest $request)
    {
        $result = $this->enumerationsService->update($activityId, $request->all());
        return response()->json($result, 200);
    }
}