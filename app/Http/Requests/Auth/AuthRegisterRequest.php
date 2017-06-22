<?php

namespace App\Http\Requests\Auth;

use App\Models\EmailAddresses;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'login' => 'required|string|max:255|unique:' . User::getTableName(),
            'email' => 'required|string|email|max:255|unique:' . EmailAddresses::getTableName() . ',address',
            'password' => 'required|string|min:6',
            'repeat_password' => 'required|string|min:6|same:password',
            'lang' => 'required|string|max:2',
            'hide_email' => 'boolean'
        ];
    }
}