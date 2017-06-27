<?php

namespace App\Http\Requests\Auth;


use App\Models\Token;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'reset_password_token' => [
                'required',
                Rule::exists(Token::getTableName(), 'value')
                    ->where('action', Token::PASSWORD_RESET_TOKEN_ACTION)
            ],
            'password' => 'required|string|min:6',
            'repeat_password' => 'required|string|min:6|same:password'
        ];
    }
}