<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use ModelTrait;

    public $timestamps = false;

    protected $guarded = ['id'];
}
