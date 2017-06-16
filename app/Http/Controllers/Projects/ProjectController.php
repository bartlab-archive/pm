<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\EnabledModule;
use App\Models\Project;
use App\Models\Tracker;
use Illuminate\Http\Request;

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
     *         "default_version_id": null,
     *         ""
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

        $projects = Project::orderBy('name')
            ->where('status', 1)
            ->with([
                'members',
                'versions',
                'issue_categories',
                'repositories',
                'boards',
            ]);

        if ($request->input('closed')) {
            $projects->orWhere('status', 5);
        }

        return $projects->get()->makeVisible(['is_my']);
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
        $project = Project::projectByIdentifier($identifier);

        $project->setAttribute('trackers', $project->trackers);
        $project->setAttribute('enabled_modules', $project->enabled_modules);

        return $project;
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'identifier' => 'required|string|between:1,100|unique:' . (new Project())->getTable(),
            'description' => 'string',
            'homepage' => 'url',
            'is_public' => 'boolean',
            'parent_id' => 'int|exists:' . (new Project())->getTable() . ',id',
            'inherit_members' => 'boolean',
            'custom_field_values' => 'string',

            'enabled_module_names' => 'array',
            'enabled_module_names.*' => 'in:' . implode(',', EnabledModule::ENABLED_MODULES_NAME),

            'tracker_ids' => 'array',
            'tracker_ids.*' => 'int|exists:' . (new Tracker())->getTable() . ',id'
        ], []);

        $project = Project::create([
            'name' => $request->input('name'),
            'identifier' => $request->input('identifier'),
            'description' => $request->input('description'),
            'homepage' => $request->input('homepage'),
            'is_public' => $request->input('is_public', 1),
            'parent_id' => $request->input('parent_id'),
            'inherit_members' => $request->input('inherit_members', 0)
        ]);

        return response($project, 201);
    }

    public function update(Request $request, $identifier)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'description' => 'string',
            'homepage' => 'url',
            'is_public' => 'boolean',
            'parent_id' => 'int|exists:' . (new Project())->getTable() . ',id',
            'inherit_members' => 'boolean',
            'custom_field_values' => 'string',

            'enabled_module_names' => 'array',
            'enabled_module_names.*' => 'in:' . implode(',', EnabledModule::ENABLED_MODULES_NAME),

            'tracker_ids' => 'array',
            'tracker_ids.*' => 'int|exists:' . (new Tracker())->getTable() . ',id'
        ], []);

        $project = Project::projectByIdentifier($identifier);

        $project->update([
            'name' => $request->input('name'),
            'identifier' => $request->input('identifier'),
            'description' => $request->input('description'),
            'homepage' => $request->input('homepage'),
            'is_public' => $request->input('is_public'),
            'parent_id' => $request->input('parent_id'),
            'inherit_members' => $request->input('inherit_members')
        ]);

        return $project;
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
        Project::deleteProjectByIdentifier($identifier);

        return response(null, 204);
    }
    
    public function getNews($identifier) {
    	
    	return Project::getNewsByProjectIdentifier($identifier);
    	
	}
}