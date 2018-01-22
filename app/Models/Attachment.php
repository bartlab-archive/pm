<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    public $timestamps = false;

    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function attachmentable()
    {
        return $this->morphTo('container');
    }
}
