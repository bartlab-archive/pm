<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    /**
     * Others field symbol in serialize data
     */
    const OTHERS_FIELD_SYMBOL = ':';

    /**
     * Default others data for serialize data
     */
    const DEFAULT_OTHERS_DATA = [
        'no_self_notified' => 1,
        'comments_sorting' => 'asc',
        'warn_on_leaving_unsaved' => 1,
        'gantt_zoom' => 2,
        'gantt_months' => 6
    ];

    protected $table = 'user_preferences';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * Parse others
     *
     * This method parses the others field
     *
     * @param UserPreference $preference
     * @return array
     */
    public static function parseOthers(UserPreference $preference)
    {
        $others = yaml_parse($preference->others);
        $result_others = [];

        foreach ($others as $key => $other) {
            $result_others[str_replace(self::OTHERS_FIELD_SYMBOL, '', $key)] = $other;
        }

        return $result_others;
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
    public static function updateOthers(UserPreference $preference, array $others = self::DEFAULT_OTHERS_DATA)
    {
        $update_others = [];

        foreach ($others as $key => $other) {
            $update_others[self::OTHERS_FIELD_SYMBOL . $key] = $other;
        }

        return $preference->update([
            'others' => yaml_emit($others)
        ]);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
