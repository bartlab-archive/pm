<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnabledModule extends Model
{
    protected $table = 'enabled_modules';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
