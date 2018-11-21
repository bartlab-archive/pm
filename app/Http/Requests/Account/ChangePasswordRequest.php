<?php

namespace App\Http\Requests\Account;

use App\Services\UsersService;
use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
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
    public function rules(UsersService $usersService)
    {
        return [
            'password' => [
                'required',
                'string',
                function ($attribute, $value, $fail) use ($usersService) {
                    if (!$usersService->validatePassword(\Auth::user()->login, $value)) {
                        return $fail('Wrong password');
                    }
                }
            ],
            'new_password' => 'required|string|min:6|different:password',
            'confirm_new_password' => 'required|string|same:new_password'
        ];
    }
}
