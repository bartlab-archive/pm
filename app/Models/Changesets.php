<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Changesets extends Model
{
    protected $table = 'changesets';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $dates = [
        'committed_on',
    ];
}
