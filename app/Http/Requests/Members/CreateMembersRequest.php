<?php

namespace App\Http\Requests\Members;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class CreateMembersRequest extends FormRequest
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
            'user_id' => 'required|int|exists:' . User::getTableName() . ',id',
            'role_id' => 'required|int|exists:' . Role::getTableName() . ',id',
        ];
    }
}
