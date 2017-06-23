<?php

namespace App\Interfaces;

interface UsersServiceInterface
{
    public function register(array $data);

    public function getUserByLoginOrEmail(string $login);
}