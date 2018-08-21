<?php

namespace App\Http\Requests\User;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class IndexUserRequest extends FormRequest
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
            'type' => 'in:all,' . User::TYPE_USER,
            'status' => 'array',
            'status.*' => 'in:' . implode(',', [User::STATUS_ACTIVE, USER::STATUS_DISABLE, User::STATUS_LOCK]),

            'group_id' => 'array',
            // todo: check for exists
            'group_id.*' => 'integer',

            'order' => 'string',
            'per_page' => 'integer',
            'page' => 'integer',
        ];
    }
}
