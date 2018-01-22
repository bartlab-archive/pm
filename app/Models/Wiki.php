<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Wiki extends Model
{
    use ModelTrait;

    protected $hidden = ['project_id'];

    public $timestamps = false;

    protected $guarded = ['id'];

    public function page()
    {
        return $this->hasMany(WikiPage::class);
    }
}
