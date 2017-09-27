<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QueriesRole extends Model
{
    protected $table = 'queries_roles';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
