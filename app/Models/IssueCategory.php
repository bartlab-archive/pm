<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class IssueCategory extends Model
{
    use ModelTrait;

    protected $hidden = ['project_id'];

    public $timestamps = false;

    protected $guarded = ['id'];

    public function issues()
    {
        return $this->hasMany(Issue::class);
    }
}
