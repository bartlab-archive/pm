<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WikiContentVersion extends Model
{
    protected $table = 'wiki_content_versions';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $dates = [
        'updated_on',
    ];
}
