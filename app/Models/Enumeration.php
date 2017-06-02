<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enumeration extends Model
{
    protected $table = 'enumerations';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
