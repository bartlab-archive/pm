<?php

namespace App\Services;

use App\Models\Member;
use Illuminate\Database\Eloquent\Builder;


/**
 * Class MembersService
 *
 * @package App\Services
 */
class MembersService
{

    public function getByProject($identifier, $with = [])
    {
//        $list =  Member::with(['user','roles'])
        return Member::with($with)
            ->whereHas('project', function ($query) use ($identifier) {
                /** @var $query Builder */
                $query->where('identifier', $identifier);
            })
            ->get();
//            ->each(function($model){
//
//            })
//            ->toArray();

//        if ($fields){
//            $list->each(function ($member){
//
//            });
//        }
//
//        return $list->toArray();
    }

    public function one($id)
    {
        return Member::query()->where(['id' => $id])->first();
    }

    public function create($projectId, $userId)
    {
        return Member::create([
            'project_id' => $projectId,
            'user_id' => $userId,
        ]);
    }

    public function destroy($id)
    {
        Member::query()->where(['id' => $id])->delete();
    }
}