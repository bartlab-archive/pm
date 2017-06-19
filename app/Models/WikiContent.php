<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WikiContent extends Model
{
    protected $table = 'wiki_contents';

    public $timestamps = true;

    /**
     * The name of the "created on" column.
     *
     * @var string
     */
    const CREATED_AT = null;

    /**
     * The name of the "updated on" column.
     *
     * @var string
     */
    const UPDATED_AT = 'updated_on';

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
