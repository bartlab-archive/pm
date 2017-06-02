<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IssueStatuse extends Model
{
    protected $table = 'issue_statuses';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
