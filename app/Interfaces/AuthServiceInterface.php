<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface AuthServiceInterface
{
    public function login(Request $request);

    public function sendResetPasswordToken(Request $request);

    public function resetPassword(Request $request);
}