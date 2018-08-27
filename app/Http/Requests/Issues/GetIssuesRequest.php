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
            'project_identifier' => 'nullable|string|exists:' . Project::getTableName() . ',identifier',

            // todo: check for exists
            'status_ids' => 'array',
            'status_ids.*' => 'integer',

            // todo: check for exists
            'tracker_ids' => 'array',
            'tracker_ids.*' => 'integer',

            // todo: check for exists
            'assigned_to_ids' => 'array',
            'assigned_to_ids.*' => 'integer',

            // todo: check for exists
            'author_ids' => 'array',
            'author_ids.*' => 'integer',

            // todo: check for exists
            'priority_ids' => 'array',
            'priority_ids.*' => 'integer',

            'group' => 'nullable|in:author,assigned,done_ratio,project,tracker,status,priority,category,version',
            'order' => 'string',
            'per_page' => 'integer',
            'page' => 'integer',
        ];
    }
}