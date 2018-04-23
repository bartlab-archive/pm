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
     */
//    public function update($memberId, $data)
//    {
//        return MemberRole::where(['member_id' => $memberId])->update($data);
//    }

//    public function one($id)
//    {
//        return MemberRole::query()->where(['id' => $id])->first();
//    }

    public function create($memberId, array $roleIds)
    {
        foreach ($roleIds as $roleId) {
            MemberRole::create([
                'member_id' => $memberId,
                'role_id' => $roleId
            ]);
        }
    }

    public function update($memberId, array $roleIds)
    {
//        MemberRole::query()->where(['member_id' => $memberId])->delete();
        $this->destroy($memberId);
        $this->create($memberId, $roleIds);
    }

    public function destroy($memberId)
    {
        MemberRole::query()->where(['member_id' => $memberId])->delete();
    }

    /**
     * Delete role by member_id
     *
     * @param int $memberId
     * @return bool
     */
//    public function deleteByMemberId($memberId)
//    {
//        return MemberRole::where(['member_id' => $memberId])->delete();
//    }
}