<?php

namespace App\Services;


use App\Interfaces\TokenServiceInterface;
use App\Interfaces\UsersServiceInterface;
use App\Traits\PasswordTrait;
use App\Interfaces\AuthServiceInterface;
use App\Models\Token;

class AuthService implements AuthServiceInterface
{
    use PasswordTrait;

    public function login(array $data): Token
    {
        return app(TokenServiceInterface::class)->one(
            app(UsersServiceInterface::class)->userByLoginOrEmail(array_get($data, 'login')),
            Token::SESSION_TOKEN_ACTION
        );
    }

    public function sendResetPasswordToken(array $data): Token
    {
        /**
         * @TODO send message in email address
         */

        return app(TokenServiceInterface::class)->one(
            app(UsersServiceInterface::class)->userByLoginOrEmail(array_get($data, 'email')),
            Token::PASSWORD_RESET_TOKEN_ACTION);
    }

    public function resetPassword(array $data): bool
    {
        $user = app(UsersServiceInterface::class)
            ->userByToken(array_get($data, 'reset_password_token'), Token::PASSWORD_RESET_TOKEN_ACTION);

        app(UsersServiceInterface::class)
            ->resetPassword($user, array_get($data, 'password'));

        return app(TokenServiceInterface::class)->destroy($user, Token::PASSWORD_RESET_TOKEN_ACTION);
    }
}