<?php

namespace App\Interfaces;

use App\Models\Token;

interface AuthServiceInterface
{
    public function login(array $data): Token;

    public function sendResetPasswordToken(array $data);

    public function resetPassword(array $data);
}