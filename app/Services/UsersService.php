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

        app(EmailAddressesService::class)->create($user, $data);
        app(UserPreferenceService::class)->create($user, $data);

        return $user;
    }

    public function userByLoginOrEmail(string $login)
    {
        return User::where('login', $login)
            ->orWhereHas('email', function ($q) use($login) {
                $q->where('address', $login);
            })
            ->first();
    }

    public function userByToken(string $token, string $action)
    {
        return User::whereHas('tokens', function($q) use($token, $action) {
            $q->where('action', $action)
                ->where('value', $token);
        })->first();
    }

    public function preparePassword(User $user, $password): string
    {
        return sha1($user->salt . sha1($password));
    }

    public function resetPassword(User $user, $new_password): bool
    {
        $user->hashed_password = sha1($user->salt . sha1($new_password));

        return $user->save();
    }

}