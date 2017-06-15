<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    protected $table = 'issues';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
        'updated_on',
        'closed_on'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'assigned_to_id');
    }

    public function author()
    {
        return $this->hasOne(User::class, 'id', 'author_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
