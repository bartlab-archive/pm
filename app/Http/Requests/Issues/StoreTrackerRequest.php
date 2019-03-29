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

class StoreTrackerRequest extends FormRequest
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
            'name' => 'required|string|max:30',
//            'is_in_chlog' => 'boolean',
//            'position' => 'integer',
//            'is_in_roadmap' => 'boolean',
            'fields_bits' => 'integer',
            'default_status_id' => 'integer',
        ];
    }
}
