<?php

namespace App\Http\Requests\Projects;

use App\Models\EnabledModule;
use App\Models\Project;
use App\Models\Tracker;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
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
            'name' => 'required|string',
            'description' => 'nullable|string',
            'homepage' => 'nullable|url',
            'is_public' => 'boolean',
            'parent_identifier' => 'string|exists:' . Project::getTableName() . ',identifier',
            'inherit_members' => 'boolean',
//            'custom_field_values' => 'string',

            // todo: check ENABLED_MODULES_NAME
//            'enabled_module_names' => 'array',
//            'enabled_module_names.*' => 'in:' . implode(',', EnabledModule::ENABLED_MODULES_NAME),

//            'tracker_ids' => 'array',
//            'tracker_ids.*' => 'int|exists:' . Tracker::getTableName() . ',id'
        ];
    }
}
