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
            'is_default' => isset($data['is_default']) ? $data['is_default'] : 1,
            'notify' => isset($data['notify']) ? $data['notify'] : 1,
        ]);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getList($params)
    {
        return EmailAddresses::where($params)->get();
    }

    public function getById($id)
    {
        return EmailAddresses::where(['id' => $id])->firstOrFail();
    }

    /**
     * @param EmailAddresses $emailAddress
     * @param array $data
     * @return mixed
     */
    public function update(EmailAddresses $emailAddress, array $data)
    {
        return $emailAddress->update($data);
    }

    /**
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function updateById(int $id, array $data)
    {
        return $this->getById($id)->update($data);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function deleteById(int $id)
    {
        return $this->getById($id)->delete();
    }
}