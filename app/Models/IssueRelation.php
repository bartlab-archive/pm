<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IssueRelation extends Model
{
    protected $table = 'issue_relations';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
