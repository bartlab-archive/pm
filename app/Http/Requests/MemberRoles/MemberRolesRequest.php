<?php

namespace App\Http\Requests\MemberRoles;

use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;

class MemberRolesRequest extends FormRequest
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
            'role_id' => 'required|int|exists:' . Role::getTableName() . ',id',
        ];
    }
}
