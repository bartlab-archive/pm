<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AccountService
{

    public function get()
    {
        return Auth::user();
    }

}