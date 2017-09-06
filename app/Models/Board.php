<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use ModelTrait;

    protected $table = 'boards';
    protected $hidden = ['project_id'];
    protected $fillable = ['name', 'description', 'position', 'parent_id', 'project_id'];

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
