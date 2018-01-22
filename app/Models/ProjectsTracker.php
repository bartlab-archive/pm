<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class ProjectsTracker extends Model
{
    use ModelTrait;

    public $timestamps = false;

    protected $guarded = ['id'];

    public function projects(){
        return $this->hasMany(Project::class);
    }

    public function trackers(){
        return $this->hasMany(Tracker::class);
    }
}
