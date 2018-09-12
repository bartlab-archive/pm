<?php

namespace App\Http\Requests\Projects;

use App\Models\Project;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreMemberRequest extends FormRequest
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
            // todo: validate by regexp
//            'identifier' => 'required|exists:' . Project::getTableName() . ',identifier',
            'user' => 'required|integer|exists:' . User::getTableName() . ',id',
            'roles' => 'required|array',
            'roles.*' => 'required|integer|exists:' . Role::getTableName() . ',id',
        ];
    }
}
