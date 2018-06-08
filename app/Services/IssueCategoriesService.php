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

    public function all($identifier, array $with = [])
    {
        return IssueCategory::query()
            ->with($with)
            ->whereHas('project', function ($query) use ($identifier) {
                $query->where('identifier', $identifier);
            })
            ->get();
    }


    public function one($id, array $with = [])
    {
        return IssueCategory::query()
            ->where('id', $id)
            ->with($with)
            ->first();
    }

    public function create(array $data)
    {
        return IssueCategory::create($data);
    }

    /**
     * Edit IssueCategory
     *
     * @param $id
     * @param $data
     * @return mixed
     */
    public function update($id, array $data)
    {
        if (($category = $this->one($id)) && $category->update($data)) {
            return $category;
        }

        return false;
    }

    public function delete($id)
    {
        return IssueCategory::find($id)->delete();
    }
}