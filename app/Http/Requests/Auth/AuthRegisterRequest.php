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
            'password' => 'required|string|min:6',
            'repeatPassword' => 'required|string|same:password',
            'firstName' => 'required|string|max:30',
            'lastName' => 'required|string|max:30',
            'email' => 'required|string|email|max:60|unique:' . EmailAddress::getTableName() . ',address',
            'lang' => [
                'required',
                'string',
                Rule::in(array_column(config('langs'), 'id')),
            ],
            'hideEmail' => 'boolean'
        ];
    }
}