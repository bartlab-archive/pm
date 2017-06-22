<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\WikiPage;
use App\Services\ProjectsService;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Validation\Rule;

/**
 * Class ProjectController
 *
 * @package App\Http\Controllers\Projects
 */
class ProjectController extends Controller
{

    protected $projectsService;

    public function __construct(ProjectsService $projectsService)
    {
        $this->projectsService = $projectsService;
    }

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
        $this->validate($request, ['closed' => 'boolean']);
        return $this->projectsService->all($request->get('closed'));
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

    public function create(CreateProjectRequest $request)
    {
        return response($this->projectsService->create($request->all()), 201);
    }

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
	
	public function getIssues($identifier, Request $request)
	{
		$result = $this->projectsService->getIssues($identifier, $request);
		return response()->json($result['projects'])->header('X-Total', $result['total']);
	}
}