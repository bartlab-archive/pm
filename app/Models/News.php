<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;

class News extends Model
{
    use ModelTrait;

    protected $hidden = ['project_id'];

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
    ];
}
