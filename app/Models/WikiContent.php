<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class WikiContent extends Model
{
    use ModelTrait;

    protected $table = 'wiki_contents';

    public $timestamps = false;

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

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{self::UPDATED_AT} = $model->freshTimestamp();
        });
    }
}
