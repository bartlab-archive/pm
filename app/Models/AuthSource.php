<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuthSource extends Model
{
    protected $table = 'auth_sources';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
