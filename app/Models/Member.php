<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;

class Member extends Model
{
    use ModelTrait;

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
    ];
}
