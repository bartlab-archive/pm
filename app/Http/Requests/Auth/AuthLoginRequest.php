<?php

namespace App\Http\Requests\Auth;

use App\Services\UsersService;
use Illuminate\Foundation\Http\FormRequest;

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
    public function rules(UsersService $usersService)
    {
        return [
            'login' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) use ($usersService) {
                    if (!$usersService->byLoginOrEmail($value)) {
                        return $fail('The selected login is invalid.');
                    }
                }
            ],
            'password' => [
                'required',
                'string',
                'min:6',
                function ($attribute, $value, $fail) use ($usersService) {
                    if (
                        ($login = $this->get('login')) &&
                        $usersService->byLoginOrEmail($login) &&
                        !$usersService->validatePassword($login, $value)
                    ) {
                        return $fail('Invalid credentials.');
                    }
                }
            ]
        ];
    }
}