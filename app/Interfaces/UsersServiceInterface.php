<?php

namespace App\Interfaces;

use App\Models\User;

interface UsersServiceInterface
{
    public function register(array $data);

    public function userByLoginOrEmail(string $login);

    public function preparePassword(User $user, $password): string;

    public function resetPassword(User $user, $new_password): bool;

    public function userByToken(string $token, string $action);
}