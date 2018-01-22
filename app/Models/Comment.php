<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public $timestamps = false;

    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
        'updated_on',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
