<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class IssueCategory extends Model
{
    use ModelTrait;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'project_id',
        'assigned_to_id'
    ];

    public function issues()
    {
        return $this->hasMany(Issue::class, 'category_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assigned() {
        // todo: may be need to create Principal model as in original redmine
        return $this->belongsTo(User::class, 'assigned_to_id');
    }
}
