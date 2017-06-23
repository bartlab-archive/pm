<?php

namespace App\Validators;


use App\Interfaces\UsersServiceInterface;

class AuthCustomValidator
{
    /**
     * @var UsersServiceInterface
     */
    protected $usersService;

    public function __construct(UsersServiceInterface $usersService)
    {
        $this->usersService = $usersService;
    }

    public function authorizeLoginRule($attribute, $value): bool
    {
        return !!$this->usersService->userByLoginOrEmail($value);
    }

    public function authorizeLoginMessage(): string
    {
        return 'The selected login is invalid.';
    }

    public function authorizePasswordRule($attribute, $value, $parameters, $validator): bool
    {
        if (!$user = $this->usersService->userByLoginOrEmail($validator->getData()['login'])) {
            return true;
        }

        return $this->usersService->preparePassword($user, $value) === $user->hashed_password;
    }

    public function authorizePasswordMessage(): string
    {
        return 'Invalid credentials.';
    }
}