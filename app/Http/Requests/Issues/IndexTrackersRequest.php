<?php

namespace App\Http\Requests\Issues;

use App\Models\Attachment;
use App\Models\Enumeration;
use App\Models\IssueStatus;
use App\Models\IssueCategory;
use App\Models\Issue;
use App\Models\User;
use App\Models\Project;
use App\Models\Tracker;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexTrackersRequest extends FormRequest
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
        ];
    }

//    public function messages()
//    {
//        return [
//            'watchers.*'=>'The value in watchers array must be an integer.'
//        ];
//    }
}