<?php

namespace App\Services;

use App\Models\MemberRole;


/**
 * Class MemberRolesService
 *
 * @package App\Services
 */
class MemberRolesService
{
    /**
     * Update member role
     *
     * @param array $data
     * @return bool
     */
    public function update($data)
    {
        $memberRole = MemberRole::where(['member_id' => $data['member_id']])->first();
        $memberRole->role_id = $data['role_id'];
        return $memberRole->save();
    }

    /**
     * Create member role
     *
     * @param $data
     * @return bool
     */
    public function create($data)
    {
        $memberRole =  new MemberRole($data);
        return $memberRole->save();
    }
}