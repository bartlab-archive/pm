<?php

namespace App\Services;

use App\Interfaces\UsersServiceInterface;
use App\Models\User;

class UsersService implements UsersServiceInterface
{
    public function register(array $data)
    {
        $salt = str_random(33);

        $user = User::create([
            'login' => array_get($data, 'login'),
            'firstname' => array_get($data, 'firstName'),
            'lastname' => array_get($data, 'lastName'),
            'language' => array_get($data, 'lang'),
            'salt' => $salt,
            'hashed_password' => sha1($salt . sha1(array_get($data, 'password'))),
            'mail_notification' => 'only_my_events'
        ]);

        app('App\Services\EmailAddressesService')->create($user, $data);
        app('App\Services\UserPreferenceService')->create($user, $data);

        return $user;
    }

    public function getUserByLoginOrEmail(string $login)
    {
        return User::where('login', $login)
            ->orWhereHas('email', function ($q) use($login) {
                $q->where('address', $login);
            })
            ->first();
    }

}