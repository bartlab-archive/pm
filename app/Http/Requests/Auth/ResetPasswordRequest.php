<?php

namespace App\Http\Requests\Auth;


use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
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
            'token' => 'required', //todo: add valid rules
            'password' => 'required|string|min:6',
            'repeat_password' => 'required|string|min:6|same:password'
        ];
    }
}