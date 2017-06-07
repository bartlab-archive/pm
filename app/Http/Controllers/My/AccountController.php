<?php

namespace App\Http\Controllers\My;


use App\Models\User;
use Illuminate\Http\Request;

class AccountController
{
    public function show(Request $request)
    {
        $account_info = [];

        $user = User::userByHeaderAuthToken($request);
        $user_email_address = $user->email;
        $user_preference = $user->preference;

        if ($user) {
            $account_info['firstname'] = $user->getAttribute('firstname');
            $account_info['lastname'] = $user->getAttribute('lastname');
            $account_info['login'] = $user->getAttribute('login');
            $account_info['lang'] = $user->getAttribute('lang');
            $account_info['created'] = $user->getAttribute('created');
        }

        if ($user_email_address) {
            $account_info['email'] = $user_email_address->getAttribute('address');
        }

        if ($user_preference) {
            $account_info['hide_email'] = $user_preference->getAttribute('hide_email');
            $account_info['time_zone'] = $user_preference->getAttribute('time_zone');
        }

        return response()->json($account_info);
    }
}