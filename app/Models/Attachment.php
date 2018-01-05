<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
//    const PROJECT_TYPE = 'Project';
    
    protected $table = 'attachments';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
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
