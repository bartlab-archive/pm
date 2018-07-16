<?php

namespace App\Http\Requests\Issues;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;

class GetIssuesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'project_identifier' => 'string|exists:' . Project::getTableName() . ',identifier',

            'status_ids' => 'array',
            'status_ids.*' => 'numeric',

            'tracker_ids' => 'array',
            'tracker_ids.*' => 'numeric',

            'assigned_to_ids' => 'array',
            'assigned_to_ids.*' => 'numeric',

            'author_ids' => 'array',
            'author_ids.*' => 'numeric',

            'priority_ids' => 'array',
            'priority_ids.*' => 'numeric',

            'group' => 'nullable|in:author,assigned,done_ratio,project,tracker,status,priority,category,version',
            'order' => 'string',
            'per_page' => 'numeric',
            'page' => 'numeric',
        ];
    }
}