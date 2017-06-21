<?php

namespace App\Models;

class Tracker extends BaseModel
{
    protected $table = 'trackers';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
