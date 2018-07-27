<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class GroupsUser extends Model
{
    use ModelTrait;

    public $timestamps = false;

    protected $guarded = ['group_id'];
}
