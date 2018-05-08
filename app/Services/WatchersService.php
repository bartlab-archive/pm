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
    public function create($data)
    {
        return Watcher::create($data);
    }

    public function massCreate($data): array
    {
        $result = [];
        $watcher = [
            'watchable_type' => array_get($data, 'watchable_type'),
            'watchable_id' => array_get($data, 'watchable_id'),
        ];

        foreach (array_get($data, 'users', []) as $user) {
            $result[] = $this->create(array_merge($watcher, ['user_id' => $user]));
        }

        return $result;
    }

    // todo: refactor
    public function delete($id, $type, $userId)
    {
        return Watcher::query()
            ->where([
                'watchable_id'=>$id,
                'watchable_type'=>$type,
                'user_id'=>$userId,
            ])
            ->delete();
    }

//    public function isWatched($id)
//    {
//        $watcher = Watcher::where('watchable_id', '=', $id)
//            ->where('user_id', '=', Auth::id())->get()->toArray();
//
//        return !empty($watcher);
//    }
}