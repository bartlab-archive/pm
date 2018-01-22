<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Changesets extends Model
{
    public $timestamps = false;

    protected $guarded = ['id'];

    protected $dates = [
        'committed_on',
    ];
}
