<?php

namespace App\Facades;

class Auth extends \Illuminate\Support\Facades\Auth
{

    public static function admin()
    {
        return !self::guest() && self::user() && self::user()->admin;
    }

}