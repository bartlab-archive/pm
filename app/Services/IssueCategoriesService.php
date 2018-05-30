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

//    protected $projectsService;
//
//    public function __construct(ProjectsService $projectsService)
//    {
//        $this->projectsService = $projectsService;
//    }

    public function one($id, $with = [])
    {
        return IssueCategory::query()
            ->where('id', $id)
            ->with($with)
            ->first();
    }

    public function all($identifier, $with = [])
    {
        return IssueCategory::query()
            ->with($with)
            ->whereHas('project', function ($query) use ($identifier) {
                $query->where('identifier', $identifier);
            })
            ->get();
    }

//    public function getCategoriesList($project_id) {
//        return IssueCategory::where('project_id', $project_id)->select('id', 'name')->get();
//    }

    /**
     * Delete IssueCategory by id
     *
     * @param int $id
     * @return bool
     */
    public function delete($id)
    {
        return IssueCategory::find($id)->delete();
    }

    public function create($data)
    {
        return IssueCategory::create($data);
    }

    /**
     * Edit IssueCategory
     *
     * @param $model
     * @param $data
     * @return mixed
     */
    public function update($id, $data)
    {
        $model = $this->one($id);

        if($model->update($data)) {
            return $model;
        }

        return false;
    }
}