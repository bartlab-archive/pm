<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WikiPage extends Model
{
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{self::CREATED_AT} = $model->freshTimestamp();
        });
    }

    protected $table = 'wiki_pages';

//    protected $fillable = ['title', 'wiki_id'];
    public $timestamps = false;

    /**
     * The name of the "created on" column.
     *
     * @var string
     */
    const CREATED_AT = 'created_on';

    /**
     * The name of the "updated on" column.
     *
     * @var string
     */
    const UPDATED_AT = null;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
    ];

    public function content()
    {
        return $this->hasOne(WikiContent::class, 'page_id');
    }

}
