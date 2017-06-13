<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Issue;
use App\Models\Project;

/**
 * Class ProjectController
 *
 * @package App\Http\Controllers\Projects
 */
class ProjectController extends Controller
{
    /**
     * Index
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
     *         "default_version_id": null
     *     },
     *     ...
     * ]
     * 
     * @return mixed
     */
    public function index()
    {
        $request = request();

        $this->validate($request, ['closed' => 'boolean']);

        $projects = Project::orderBy('name')->where('status', 1);

        if ($request->input('closed')) {
            $projects->orWhere('status', 5);
        }

        return $projects->get();
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
        return Project::where('identifier', $identifier)->firstOrFail();
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
        $project = Project::where('identifier', $identifier)->firstOrFail();

        /**
         * Destroy attach trackers
         */
        $project->trackers()->detach();

        /**
         * Destroy attach issues
         */
        Issue::destroy($project->issues->pluck('id')->toArray());

        /**
         * Destroy project
         */
        $project->delete();

        return response(null, 204);
    }
}