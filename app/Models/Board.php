<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use ModelTrait;

    protected $hidden = ['project_id'];

    protected $fillable = ['name', 'description', 'position', 'parent_id', 'project_id'];

    public $timestamps = false;

    protected $guarded = ['id'];
}
