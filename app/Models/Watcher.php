<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Watcher extends Model
{
    use ModelTrait;

    public $timestamps = false;

    protected $guarded = ['id'];

    public function watchable()
    {
        return $this->morphTo('watchable');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
