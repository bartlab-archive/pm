<?php

namespace App\Services;

use App\Models\Watcher;
use Illuminate\Support\Facades\Auth;

/**
 * Class WatchersService
 *
 * @package App\Services
 */
class WatchersService
{
    public function one($id, $type, $userId){
        return Watcher::query()
            ->where([
                'watchable_id' => $id,
                'watchable_type' => $type,
                'user_id' => $userId,
            ])
            ->first();
    }

    public function create($id, $type, $userId)
    {
        return Watcher::create([
            'watchable_type' => $type,
            'watchable_id' => $id,
            'user_id' => $userId
        ]);
    }

    public function massCreate($id, $type, $users): array
    {
        $result = [];

        foreach ($users as $user) {
            $result[] = $this->create($id, $type, $user);
        }

        return $result;
    }

    public function delete($watcherId)
    {
        return Watcher::destroy($watcherId);
    }

//    public function isWatched($id)
//    {
//        $watcher = Watcher::where('watchable_id', '=', $id)
//            ->where('user_id', '=', Auth::id())->get()->toArray();
//
//        return !empty($watcher);
//    }
}