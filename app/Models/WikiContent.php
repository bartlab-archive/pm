<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class WikiContent extends Model
{
    use ModelTrait;

    const CREATED_AT = null;
    const UPDATED_AT = 'updated_on';

//    public $timestamps = false;

    protected $guarded = ['id'];

    protected $dates = [
        'updated_on',
    ];

    protected $fillable = [
        'author_id',
        'text',
        'comments'
    ];

//    public static function boot()
//    {
//        parent::boot();
//
//        static::creating(function ($model) {
//            $model->{self::UPDATED_AT} = $model->freshTimestamp();
//        });
//    }

    public function page()
    {
        return $this->belongsTo(WikiPage::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class);
    }

    public function versions()
    {
        return $this->hasMany(WikiContentVersion::class);
    }
}
