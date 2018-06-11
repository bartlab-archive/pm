<?php

namespace App\Http\Requests\Issues;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class IssueCategoriesRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'max:255',
//                Rule::unique(IssueCategory::getTableName(), 'name')->where('project_id', $project->id)
            ],
            'assigned_to_id' => 'nullable|exists:' . User::getTableName() . ',id'
            // todo: add check is assigned_to_id is member of related project
//                            Rule::exists(Member::getTableName(), 'user_id')
//                                ->where('project_id', $project->id)
        ];
    }
}
