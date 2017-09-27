<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomFieldsTracker extends Model
{
    protected $table = 'custom_fields_trackers';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
