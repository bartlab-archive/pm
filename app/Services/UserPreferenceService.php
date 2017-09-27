<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserPreference;

class UserPreferenceService
{

    public function create(User $user, array $data)
    {
        return $user->preference()->create([
            'hide_mail' => array_get($data, 'hideEmail'),
            'time_zone' => \Config::get('app.timezone'),
            'others' => self::updateOthers()
        ]);
    }

    public static function updateOthers(array $others = UserPreference::DEFAULT_OTHERS_DATA)
    {
        $update_others = [];

        foreach ($others as $key => $other) {
            $update_others[UserPreference::OTHERS_FIELD_SYMBOL . $key] = $other;
        }

        return yaml_emit($update_others);
    }

    public function updateByUserId($userId, $data)
    {
        $others = UserPreference::DEFAULT_OTHERS_DATA;
        foreach ($others as $key => $val) {
            if (isset($data[$key])) {
                $others[$key] = $data[$key];
                unset($data[$key]);
            };
        }
        $data['others'] = self::updateOthers($others);

        return UserPreference::where('user_id', $userId)->update($data);
    }
}