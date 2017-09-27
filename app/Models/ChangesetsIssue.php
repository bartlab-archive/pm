<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChangesetsIssue extends Model
{
    protected $table = 'changesets_issues';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
