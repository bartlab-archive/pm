<?php

namespace App\Interfaces;

use App\Models\Token;

interface AuthServiceInterface
{
    public function session(string $login): Token;

    public function sendResetPasswordToken(string $email);

    public function resetPassword(array $data);
}