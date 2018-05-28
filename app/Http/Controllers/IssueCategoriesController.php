<?php

namespace App\Http\Controllers;

use App\Http\Requests\IssueCategories\IssueCategoriesRequest;
use App\Http\Resources\IssuesCategoryResource;
use App\Services\IssueCategoriesService;
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
    protected $projectsService;

    public function __construct(
        IssueCategoriesService $issueCategoriesService,
        ProjectsService $projectsService
    )
    {
        $this->issueCategoriesService = $issueCategoriesService;
        $this->projectsService = $projectsService;
    }

    public function index($identifier)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        return IssuesCategoryResource::collection(
            $this->issueCategoriesService->all($identifier)
        );
    }

    public function show($id)
    {

        if (!$issueCategory = $this->issueCategoriesService->one($id)) {
            return abort(404);
        }

        return IssuesCategoryResource::make($issueCategory);
    }

    public function store($identifier, IssueCategoriesRequest $request)
    {
        if (!$project = $this->projectsService->one($identifier)) {
            abort(404);
        }

        return IssuesCategoryResource::make(
            $this->issueCategoriesService->create(
                $identifier,
                array_merge(
                    $request->validated(),
                    [
                        'project_id' => $project->id
                    ]
                )
            )
        );

    }

    public function update($request)
    {

    }

    public function destroy($request)
    {

    }
}