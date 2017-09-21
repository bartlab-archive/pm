<?php

namespace App\Services;

use App\Models\EmailAddresses;
use App\Models\User;

/**
 * Class EmailAddressesService
 *
 * @property int $id
 * @property int $user_id
 * @property string $address
 * @property bool $is_default
 * @property bool $notify
 * @property string $created_on
 * @property string $updated_on
 *
 * @package App\Services
 */
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

    /**
     * @param $userId
     * @return mixed
     */
    public function getByUserId($userId)
    {
        return EmailAddresses::where('user_id', $userId)->first();
    }

    /**
     * @param $userId
     * @param $data
     * @return mixed
     */
    public function updateByUserId($userId, $data)
    {
        return EmailAddresses::where('user_id', $userId)->first()->update($data);
    }

}