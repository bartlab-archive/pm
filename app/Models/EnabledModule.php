<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnabledModule extends Model
{
    protected $table = 'enabled_modules';

    public $timestamps = false;

    const ENABLED_MODULES_NAME = [
        'issue_tracking',
        'time_tracking',
        'news',
        'documents',
        'files',
        'wiki',
        'repository',
        'boards',
        'calendar',
        'gantt',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
