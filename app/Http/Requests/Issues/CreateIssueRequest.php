<?php

namespace App\Http\Requests\Issues;

use App\Models\Enumeration;
use App\Models\IssueStatus;
use App\Models\IssueCategory;
use App\Models\Issue;
use App\Models\User;
use App\Models\Project;
use App\Models\Tracker;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateIssueRequest extends FormRequest
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
        // todo: move project validation to external validation class
        // todo: rewrite validate with project identifier
//        $project = Project::query()
//            ->where('identifier', $this->project_identifier)
//            ->first();

        return [
            'watchers' => 'array',
            // todo: add distinct rules?
            'watchers.*' => 'int|exists:' . User::getTableName() . ',id',

            'assigned_to_id' => 'nullable|int|exists:' . User::getTableName() . ',id',
            'category_id' => 'nullable|int|exists:' . IssueCategory::getTableName() . ',id',
//            'category_id' => [
//                'nullable',
//                'int',
//                Rule::exists(IssueCategory::getTableName(), 'id')
//                    ->where('project_id', $project ? $project->id : null)
//            ],
            'done_ratio' => 'nullable|int|min:0|max:100',
            'due_date' => 'nullable|date|after_or_equal:start_date',
            'estimated_hours' => 'nullable|numeric',
            'parent_id' => 'nullable|int|exists:' . Issue::getTableName() . ',id',
//            'parent_id' => [
//                'nullable',
//                'int',
//                Rule::exists(Issue::getTableName(), 'id')
//                    ->where('project_id', $project ? $project->id : null)
//            ],
            // todo: add required_if for start_date if due_date exists (tried, but didin't work)
            'start_date' => 'nullable|date',
            'subject' => 'required|string',
            'description' => 'nullable|string',
            'priority_id' => [
                'required',
                'int',
                Rule::exists(Enumeration::getTableName(), 'id')
                    ->where('type', Issue::ENUMERATION_PRIORITY)
            ],
            'is_private' => 'boolean',
            'project_identifier' => 'required|string|exists:' . Project::getTableName() . ',identifier',
            'tracker_id' => 'required|int|exists:' . Tracker::getTableName() . ',id',
            'status_id' => 'required|int|exists:' . IssueStatus::getTableName() . ',id'
        ];
    }

//    public function messages()
//    {
//        return [
//            'watchers.*'=>'The value in watchers array must be an integer.'
//        ];
//    }
}