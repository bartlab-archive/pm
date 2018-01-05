<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Watcher extends Model
{
    protected $table = 'watchers';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function watchable()
    {
        return $this->morphTo('watchable');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
