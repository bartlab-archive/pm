<?php

namespace App\Http\Controllers\My;


use App\Models\User;
use Illuminate\Http\Request;

class AccountController
{
    public function show(Request $request)
    {
        $user = User::getUserByAccessToken($request);
        $user_email_address = $user->email;
        $user_preference = $user->preference;

        return response()->json([
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'email' => $user_email_address->address,
            'lang' => $user->language,
            'login' => $user->login,
            'created' => $user->created_on,
            'hide_email' => $user_preference->hide_mail,
            'time_zone' => $user_preference->time_zone,
        ]);
    }
}