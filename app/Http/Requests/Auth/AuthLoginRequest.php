<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

class AuthLoginRequest extends FormRequest
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
        Validator::extend('authorize.login', '\App\Validators\AuthCustomValidator@authorizeLoginRule');
        Validator::replacer('authorize.login', '\App\Validators\AuthCustomValidator@authorizeLoginMessage');
        Validator::extend('authorize.password', '\App\Validators\AuthCustomValidator@authorizePasswordRule');
        Validator::replacer('authorize.password', '\App\Validators\AuthCustomValidator@authorizePasswordMessage');

        return [
            'login' => 'required|string|max:255|authorize.login',
            'password' => 'required|string|min:6|authorize.password'
        ];
    }
}