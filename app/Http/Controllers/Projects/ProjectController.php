<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\EnabledModule;
use App\Models\Project;
use App\Models\Wiki;
use App\Models\WikiPage;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Validation\Rule;
use App\Models\Tracker;

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
    public function index(Request $request)
    {
//        $request = request();

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

    protected function getWikiPageMarkDown($identifier, $page_title = null)
    {
        $user_projects = Auth::user()->projects;

        $project = $user_projects->where('identifier', $identifier)->first();

        if (is_null($project)) {
            abort(403);
        }

        $wiki_content = $project->wiki
            ->page()
            ->with('content');

        if ($page_title) {
            $wiki_content->where('title', $page_title);
        } else {
            $wiki_content->where('parent_id', null);
        }

        $wiki_content = $wiki_content->first()->toArray();

        return response()->json(array_merge(is_null($wiki_content['content']) ? [] : $wiki_content['content'] , ['title' => $wiki_content['title']]));
    }

    protected function setWikiPageMarkDown(Request $request, $project_identifier, $wiki_id, $name = null)
    {
        $user_projects = Auth::user()->projects;
        $project = $user_projects->where('identifier', $project_identifier)->first();

        if (is_null($project)) {
            abort(403);
        }

        $wiki_content = $project->wiki->page();

        if ($name) {
            $wiki_content->where('title', $wiki_id);
            $wiki_id = $name;
        } else {
            $wiki_content->where('id', $wiki_id);
        }

        $wiki_content = $wiki_content
            ->with(['content' => function ($q) use($wiki_id) {
                $q->where('id', $wiki_id);
            }])
            ->firstOrFail();
        $wiki_content->content->update([
            'text' => $request->input('text')
        ]);

        $wiki_content = $wiki_content->toArray();

        return response()->json(array_merge($wiki_content['content'], ['title' => $wiki_content['title']]));
    }

    protected function addNewWiki(Request $request, $project_identifier)
    {
        $project = Auth::user()->projects()->where('identifier', $project_identifier)->firstOrFail();
        $wiki = $project->wiki;

        $this->validate($request, [
            'title' => [
                'required',
                Rule::unique((new WikiPage())->getTable(), 'title')->where('wiki_id', $wiki->id)
            ],
            'text' => 'required|string'
        ], []);

        $new_page = $wiki->page()->create([
            'title' => $request->input('title'),
            'parent_id' => $wiki->page->first()->id
        ]);

        $new_page_content = $new_page->content()->create([
            'author_id' => Auth::user()->id,
            'text' => $request->input('text'),
            'version' => 1
        ]);

        return response()->json(array_merge($new_page_content->toArray(), ['title' => $new_page->title]), 201);
    }

    protected function getAllWikiPage(Request $request, $project_identifier)
    {
        $project = Auth::user()->projects()->where('identifier', $project_identifier)->firstOrFail();

        $wiki = $project->wiki->page()->with('content')->get();

        return $wiki;
    }

    public function getNews($identifier) {

    	return Project::getNewsByProjectIdentifier($identifier);

	}
}