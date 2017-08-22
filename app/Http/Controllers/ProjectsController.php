<?php

namespace App\Http\Controllers;

use App\Http\Requests\Projects\CreateProjectRequest;
use App\Http\Requests\Projects\IndexProjectRequest;
use App\Http\Requests\Projects\UpdateProjectRequest;
use App\Services\IssuesService;
use App\Services\ProjectsService;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

/**
 * Class ProjectController
 *
 * @package App\Http\Controllers\Projects
 */
class ProjectsController extends BaseController
{

    protected $projectsService;
    protected $issueService;

    public function __construct(ProjectsService $projectsService, IssuesService $issuesService)
    {
        $this->projectsService = $projectsService;
        $this->issueService = $issuesService;
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
    
    public function getIssues($identifier, Request $request)
    {
    	$result = $this->projectsService->getIssues($identifier, $request);

    	return response()->json($result['projects'])->header('X-Total', $result['total']);
    }

    public function getProjectTrackers($identifier) {

        $result = $this->issueService->trackers($identifier);

        return response()->json($result, 200);
    }

   
}