<?php

namespace App\Services;

use App\Models\IssueCategory;

class IssueCategoriesService
{

    public function getCategoriesList($project_id) {
        return IssueCategory::where('project_id', $project_id)->select('id', 'name')->get();
    }

}