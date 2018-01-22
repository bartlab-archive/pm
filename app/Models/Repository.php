<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Repository extends Model
{
    public $timestamps = false;

    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
    ];

}
