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
    public function one($id, $type, $userId)
    {
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

    public function massCreate($id, $type, array $users = []): array
    {
        $result = [];

        foreach ($users as $userId) {
            $result[] = $this->create($id, $type, $userId);
        }

        return $result;
    }

    public function delete(int $watcherId)
    {
        return Watcher::destroy($watcherId);
    }

}