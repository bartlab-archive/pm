<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectsTracker extends Model
{
    protected $table = 'projects_trackers';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
