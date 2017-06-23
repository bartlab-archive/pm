<?php

namespace App\Services;


use App\Traits\PasswordTrait;
use App\Interfaces\AuthServiceInterface;
use App\Models\Token;

class AuthService implements AuthServiceInterface
{
    use PasswordTrait;

    public function login(array $data): Token
    {
        $user = app('App\Interfaces\UsersServiceInterface')
            ->getUserByLoginOrEmail(array_get($data, 'login'));

        if (is_null($user)) {
            abort(400, 'The selected login is invalid.');
        }

        $pass = $this->preparePassword($user, array_get($data, 'password'));

        if ($pass !== $user->hashed_password) {
            abort(400, 'Invalid credentials');
        }

        return app('App\Interfaces\TokenServiceInterface')
            ->firstOrCreate($user, Token::SESSION_TOKEN_ACTION, sha1($user->hashed_password));
    }

    public function sendResetPasswordToken(array $data): Token
    {
        /**
         * @TODO SEND MESSAGE BY EMAIL
         */

        $user = app('App\Interfaces\UsersServiceInterface')
            ->getUserByLoginOrEmail(array_get($data, 'email'));

        return app('App\Interfaces\TokenServiceInterface')
            ->firstOrCreate($user, Token::PASSWORD_RESET_TOKEN_ACTION, sha1($user->hashed_password));
    }

    public function resetPassword(array $data): bool
    {
        $token = Token::where('value', array_get($data, 'token'))
            ->where('action', Token::PASSWORD_RESET_TOKEN_ACTION)
            ->firstOrFail();

        $this->reset($token->user, array_get($data, 'password'));

        return $token->delete();
    }
}