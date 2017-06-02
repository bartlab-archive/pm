<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChangesetParent extends Model
{
    protected $table = 'changeset_parents';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'hashed_password',
    ];
}
