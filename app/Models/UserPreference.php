<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\Yaml\Yaml;

class UserPreference extends Model
{
    /**
     * Others field symbol in serialize data
     */
//    const OTHERS_FIELD_SYMBOL = ':';

    /**
     * Default others data for serialize data
     */
    const DEFAULT_OTHERS_DATA = [
        ':no_self_notified' => 1,
        ':comments_sorting' => 'asc',
        ':warn_on_leaving_unsaved' => 1
    ];

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $casts = [
        'hide_mail' => 'boolean',
    ];

    public function getOthersAttribute($value)
    {
//        $others = Yaml::parse($value);
//        $result_others = [];
//
//        foreach ($others as $key => $other) {
//            $result_others[str_replace(self::OTHERS_FIELD_SYMBOL, '', $key)] = $other;
//        }
//
//        return $result_others;
        return Yaml::parse($value);
    }

    /**
     * Update others
     *
     * This method updates the others field generate valid serialize string
     *
     * @param UserPreference $preference
     * @param array $others
     * @return bool
     */
//    public static function updateOthers(UserPreference $preference, array $others = self::DEFAULT_OTHERS_DATA)
//    {
//        $update_others = [];
//
//        foreach ($others as $key => $other) {
//            $update_others[self::OTHERS_FIELD_SYMBOL . $key] = $other;
//        }
//
//        return $preference->update([
//            'others' => Yaml::dump($others)
//        ]);
//    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
