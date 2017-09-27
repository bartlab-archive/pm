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
     * @param int $memberId
     * @param array $data
     * @return bool
     */
    public function update($memberId, $data)
    {
        return MemberRole::where(['member_id' => $memberId])->update($data);
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

    /**
     * Delete role by member_id
     *
     * @param int $memberId
     * @return bool
     */
    public function deleteByMemberId($memberId)
    {
        return MemberRole::where(['member_id' => $memberId])->delete();
    }
}