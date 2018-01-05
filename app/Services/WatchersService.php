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
    public function startWatching($data)
    {
        return Watcher::create($data);
    }

    public function stopWatching($data)
    {
        return Watcher::where('watchable_id', '=', $data['watchable_id'])
            ->where('user_id', '=', $data['user_id'])
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