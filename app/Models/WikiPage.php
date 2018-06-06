<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class WikiPage extends Model
{
    use ModelTrait;

    const CREATED_AT = 'created_on';
    const UPDATED_AT = null;

//    public $timestamps = false;

    protected $guarded = ['id'];

    protected $casts = [
        'protected' => 'boolean',
    ];

    protected $dates = [
        'created_on',
    ];

    protected $fillable = [
        'title',
        'parent_id',
        'protected'
//        'author_id'
    ];

    public function content()
    {
        return $this->hasOne(WikiContent::class, 'page_id');
    }

    public function wiki()
    {
        return $this->belongsTo(Wiki::class);
    }

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function watchers()
    {
        return $this->morphToMany(User::class, 'watchable', Watcher::getTableName(), 'watchable_id');
    }

//    public function childs()
//    {
//        return $this->hasMany(self::class, 'parent_id')->with(['childs']);
//    }

}
