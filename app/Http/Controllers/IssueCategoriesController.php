<?php

namespace App\Http\Controllers;

use App\Http\Requests\Issues\IssueCategoriesRequest;
use App\Http\Resources\IssuesCategoryResource;
use App\Services\EnabledModulesService;
use App\Services\IssuesService;
use App\Services\ProjectsService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class IssuesCategoriesController
 *
 * @package App\Http\Controllers\Projects
 */
class IssueCategoriesController extends BaseController
{
    protected $issuesService;
    protected $projectsService;
    protected $enabledModulesService;

    public function __construct(
        IssuesService $issuesService,
        ProjectsService $projectsService,
        EnabledModulesService $enabledModulesService
    )
    {
        $this->issuesService = $issuesService;
        $this->projectsService = $projectsService;
        $this->enabledModulesService = $enabledModulesService;
    }

    public function index($identifier)
    {
        if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
            abort(404);
        }

        if (!$this->enabledModulesService->check($project->id, $this->issuesService::MODULE_NAME)) {
            abort(403);
        }

        return IssuesCategoryResource::collection(
            $this->issuesService->categories($project->id, ['assigned'])
        );
    }

    public function show($id)
    {
        if (!$category = $this->issuesService->category($id, ['project', 'assigned'])) {
            return abort(404);
        }

        if (!$this->enabledModulesService->check($category->project_id, $this->issuesService::MODULE_NAME)) {
            abort(403);
        }

        return IssuesCategoryResource::make($category);
    }

    public function store($identifier, IssueCategoriesRequest $request)
    {
        if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
            abort(404);
        }

        if (!$this->enabledModulesService->check($project->id, $this->issuesService::MODULE_NAME)) {
            abort(403);
        }

        // todo: validate for unique name

        return IssuesCategoryResource::make(
            $this->issuesService->createCategory(
                array_merge(
                    $request->validated(),
                    ['project_id' => $project->id]
                )
            )
        );

    }

    public function update($id, IssueCategoriesRequest $request)
    {

//        if (!$this->enabledModulesService->check($project->identifier, $this->issueCategoriesService::MODULE_NAME)) {
//            return abort(403);
//        }

        if (!$category = $this->issuesService->category($id)) {
            return abort(404);
        }

        if (!$this->enabledModulesService->check($category->project_id, $this->issuesService::MODULE_NAME)) {
            abort(403);
        }

        // todo: validate for unique name

        if (!$result = $this->issuesService->updateCategory($id, $request->validated())) {
            // todo: add error message
            return abort(422);
        }

        return IssuesCategoryResource::make($result);

    }

    public function destroy($id)
    {
        if (!$category = $this->issuesService->category($id)) {
            return abort(404);
        }

        if (!$this->enabledModulesService->check($category->project_id, $this->issuesService::MODULE_NAME)) {
            abort(403);
        }

        if (!$this->issuesService->deleteCategory($id)) {
            return abort(422);
        }

        return response(null, 204);
    }
}