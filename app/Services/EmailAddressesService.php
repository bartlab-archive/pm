<?php

namespace App\Services;

use App\Models\User;

class EmailAddressesService
{

    public function create(User $user, array $data)
    {
        return $user->email()->create([
            'address' => array_get($data, 'email'),
            'is_default' => 1,
            'notify' => 1,
        ]);
    }

}