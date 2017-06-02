<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomFieldsProject extends Model
{
    protected $table = 'custom_fields_projects';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
