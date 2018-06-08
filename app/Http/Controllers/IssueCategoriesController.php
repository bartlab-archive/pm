<?php

namespace App\Http\Controllers;

use App\Http\Requests\IssueCategories\IssueCategoriesRequest;
use App\Http\Resources\IssuesCategoryResource;
use App\Services\EnabledModulesService;
use App\Services\IssueCategoriesService;
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
    protected $issueCategoriesService;
    protected $issuesService;
    protected $projectsService;
    protected $enabledModulesService;

    public function __construct(
        IssueCategoriesService $issueCategoriesService,
        IssuesService $issuesService,
        ProjectsService $projectsService,
        EnabledModulesService $enabledModulesService
    )
    {
        $this->issueCategoriesService = $issueCategoriesService;
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
            $this->issueCategoriesService->all($identifier, ['assigned'])
        );
    }

    public function show($id)
    {
        if (!$category = $this->issueCategoriesService->one($id, ['issues', 'project', 'assigned'])) {
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

        return IssuesCategoryResource::make(
            $this->issueCategoriesService->create(
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

        if (!$category = $this->issueCategoriesService->one($id)) {
            return abort(404);
        }

        if (!$this->enabledModulesService->check($category->project_id, $this->issuesService::MODULE_NAME)) {
            abort(403);
        }

        if (!$result = $this->issueCategoriesService->update($id, $request->validated())) {
            // todo: add error message
            return abort(422);
        }

        return IssuesCategoryResource::make($result);

    }

    public function destroy($id)
    {
        if (!$category = $this->issueCategoriesService->one($id)) {
            return abort(404);
        }

        if (!$this->enabledModulesService->check($category->project_id, $this->issuesService::MODULE_NAME)) {
            abort(403);
        }

        $this->issueCategoriesService->delete($id);

        //todo: add 422 code response if deleting was not done

        return response(null, 204);
    }
}