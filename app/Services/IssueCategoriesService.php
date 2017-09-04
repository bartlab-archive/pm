<?php

namespace App\Services;

use App\Models\IssueCategory;

/**
 * Class IssueCategoriesService
 *
 * @property ProjectsService $projectsService
 *
 * @package App\Services
 */
class IssueCategoriesService
{

    protected $projectsService;

    public function __construct(ProjectsService $projectsService)
    {
        $this->projectsService = $projectsService;
    }

    public function getCategoriesList($project_id) {
        return IssueCategory::where('project_id', $project_id)->select('id', 'name')->get();
    }

    /**
     * Delete IssueCategory by id
     *
     * @param int $issueCategoryId
     * @return bool
     */
    public function deleteById($issueCategoryId)
    {
        return IssueCategory::find($issueCategoryId)->delete();
    }

    /**
     * Create IssueCategory
     *
     * @param $identifier
     * @param $data
     * @return bool
     */
    public function create($identifier, $data)
    {
        $project = $this->projectsService->one($identifier);
        $data['project_id'] = $project->id;

        $issueCategory = new IssueCategory($data);
        return $issueCategory->save();
    }

    /**
     * Edit IssueCategory
     *
     * @param $issueCategoryId
     * @param $data
     * @return mixed
     */
    public function update($issueCategoryId, $data)
    {
        $version = IssueCategory::where(['id' => $issueCategoryId])->firstOrFail();
        return $version->update($data);
    }
}