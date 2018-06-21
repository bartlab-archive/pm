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
        return Yaml::parse($value);
    }

    public function setOthersAttribute($value)
    {
        return $this->attributes['others'] = Yaml::dump($value);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
