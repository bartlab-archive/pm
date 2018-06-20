<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use ModelTrait;

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
    ];

    protected $fillable = [
        'container_id',
        'container_type',
        'filename',
        'disk_filename',
        'filesize',
        'content_type',
        'digest',
        'downloads',
        'author_id',
        'description',
        'disk_directory'
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
