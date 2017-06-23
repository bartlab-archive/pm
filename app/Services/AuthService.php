<?php

namespace App\Services;


use App\Interfaces\TokenServiceInterface;
use App\Interfaces\UsersServiceInterface;
use App\Interfaces\AuthServiceInterface;
use App\Models\Token;

class AuthService implements AuthServiceInterface
{
    /**
     * @var TokenServiceInterface
     */
    protected $tokenService;

    /**
     * @var UsersServiceInterface
     */
    protected $usersService;

    public function __construct(
        TokenServiceInterface $tokenService,
        UsersServiceInterface $usersService
    )
    {
        $this->tokenService = $tokenService;
        $this->usersService = $usersService;
    }

    public function session(string $login): Token
    {
        return $this->tokenService->one(
            $this->usersService->userByLoginOrEmail($login),
            Token::SESSION_TOKEN_ACTION
        );
    }

    public function sendResetPasswordToken(string $email): Token
    {
        /**
         * @TODO send message in email address
         */

        return $this->tokenService->one(
            $this->usersService->userByLoginOrEmail($email),
            Token::PASSWORD_RESET_TOKEN_ACTION
        );
    }

    public function resetPassword(array $data): bool
    {
        $user = $this->usersService->userByToken(
            array_get($data, 'reset_password_token'),
            Token::PASSWORD_RESET_TOKEN_ACTION
        );

        $this->usersService->resetPassword($user, array_get($data, 'password'));

        return $this->tokenService->destroy($user, Token::PASSWORD_RESET_TOKEN_ACTION);
    }
}