<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimeEntrie extends Model
{
    protected $table = 'time_entries';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
        'updated_on',
    ];
}
