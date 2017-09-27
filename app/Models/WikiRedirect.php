<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WikiRedirect extends Model
{
    protected $table = 'wiki_redirects';

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
}
