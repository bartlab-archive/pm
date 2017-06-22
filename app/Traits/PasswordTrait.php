<?php

namespace App\Traits;


use App\Models\User;

trait PasswordTrait
{
    protected function resetPassword(User $user, $new_password)
    {
        $user->hashed_password = sha1($user->salt . sha1($new_password));
        $user->save();
    }

    protected function preparePassword(User $user, $password)
    {
        return sha1($user->salt . sha1($password));
    }
}