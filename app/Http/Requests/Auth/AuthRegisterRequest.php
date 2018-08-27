<?php

namespace App\Http\Requests\Auth;

use App\Models\EmailAddress;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AuthRegisterRequest extends FormRequest
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
     * Gets the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'login' => [
                'required',
                'string',
                'max:60',
                'unique:' . User::getTableName(),
                'regex:/^[a-z0-9_\-@\.]*$/i'
            ],
            // todo: Minimum password length from settings
            'password' => 'required|string|min:6',
            'repeat_password' => 'required|string|same:password',
            'firstname' => 'required|string|max:30',
            'lastname' => 'required|string|max:30',
            'email' => 'required|string|email|max:60|unique:' . EmailAddress::getTableName() . ',address',
            'language' => [
//                'required',
                'string',
                Rule::in(array_column(config('langs'), 'id')),
            ],
            'hide_email' => 'boolean'
        ];
    }
}