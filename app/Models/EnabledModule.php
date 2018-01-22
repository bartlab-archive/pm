<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnabledModule extends Model
{
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

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $hidden = ['project_id', 'id'];
}
