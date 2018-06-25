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
        'no_self_notified' => '1',
        'comments_sorting' => 'asc',
        'warn_on_leaving_unsaved' => '1'
    ];

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $casts = [
        'hide_mail' => 'boolean',
    ];

    public function getOthersAttribute($value)
    {
        $others = [];

        foreach (Yaml::parse($value) as $key => $field) {
            if (isset($key[0]) && $key[0] === ':') {
                $others[substr($key, 1)] = $field;
            } else {
                $others[$key] = $field;
            }
        }

        return $others;
    }

    public function setOthersAttribute($value)
    {
        $others = ['---'];

        foreach (explode(PHP_EOL, Yaml::dump($value)) as $line) {
            if (isset($line[0]) && !\in_array($line[0], [':', '\'', '"', ' '], true)) {
                $others[] = ':' . $line;
            } else {
                $others[] = $line;
            }
        }

        return $this->attributes['others'] = implode(PHP_EOL, $others);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
