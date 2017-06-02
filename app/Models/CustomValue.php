<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomValue extends Model
{
    protected $table = 'custom_values';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
