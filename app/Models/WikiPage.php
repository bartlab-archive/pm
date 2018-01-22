<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class WikiPage extends Model
{
    use ModelTrait;

    const CREATED_AT = 'created_on';
    const UPDATED_AT = null;

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
    ];

//    public static function boot()
//    {
//        parent::boot();
//
//        static::creating(function ($model) {
//            $model->{self::CREATED_AT} = $model->freshTimestamp();
//        });
//    }

    public function content()
    {
        return $this->hasOne(WikiContent::class, 'page_id');
    }

}
