<?php

namespace App\Services;

class AuthService
{
    const SESSION_TOKEN_ACTION = 'session';

    /**
     * @var TokenService
     */
    protected $tokenService;

    /**
     * @var UsersService
     */
    protected $usersService;

    public function __construct(
        TokenService $tokenService,
        UsersService $usersService
    )
    {
        $this->tokenService = $tokenService;
        $this->usersService = $usersService;
    }

    public function session($userId)
    {
//        if ($user = $this->usersService->byLogin($login)) {
            return $this->tokenService->oneByUserId($userId, self::SESSION_TOKEN_ACTION, ['user'], true);
//        }

//        return false;
    }

    public function find($token)
    {
        return $this->tokenService->oneByValue($token, self::SESSION_TOKEN_ACTION, ['user']);
    }

//    public function sendResetPasswordToken(string $email): Token
//    {
//        /**
//         * @TODO send message in email address
//         */
//
//        return $this->tokenService->one(
//            $this->usersService->userByLoginOrEmail($email),
//            Token::PASSWORD_RESET_TOKEN_ACTION
//        );
//    }
//
//    public function resetPassword(array $data): bool
//    {
//        $user = $this->usersService->userByToken(
//            array_get($data, 'reset_password_token'),
//            Token::PASSWORD_RESET_TOKEN_ACTION
//        );
//
//        $this->usersService->resetPassword($user, array_get($data, 'password'));
//
//        return $this->tokenService->destroy($user, Token::PASSWORD_RESET_TOKEN_ACTION);
//    }
}