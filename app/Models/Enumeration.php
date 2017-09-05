<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Enumeration extends Model
{
    use ModelTrait;

    protected $table = 'enumerations';

    protected $hidden = ['project_id'];

    protected $fillable = ['name', 'position', 'is_default', 'type', 'active', 'project_id', 'parent_id', 'position_name'];

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
