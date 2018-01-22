<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChangesetParent extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name', 'email', 'hashed_password',
    ];
}
