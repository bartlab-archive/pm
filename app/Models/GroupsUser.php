<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupsUser extends Model
{
    protected $table = 'groups_users';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
