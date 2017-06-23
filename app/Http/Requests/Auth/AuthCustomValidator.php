<?php

namespace App\Http\Requests\Auth;


use App\Interfaces\UsersServiceInterface;

class AuthCustomValidator
{
    public function authorizeLoginRule($attribute, $value): bool
    {
        return !!app(UsersServiceInterface::class)->userByLoginOrEmail($value);
    }

    public function authorizeLoginMessage(): string
    {
        return 'The selected login is invalid.';
    }

    public function authorizePasswordRule($attribute, $value): bool
    {
        if (is_null($user = app(UsersServiceInterface::class)->userByLoginOrEmail(request('login')))) {
            return true;
        }

        return app('App\Interfaces\UsersServiceInterface')
                ->preparePassword($user, $value) === $user->hashed_password;
    }

    public function authorizePasswordMessage(): string
    {
        return 'Invalid credentials.';
    }
}