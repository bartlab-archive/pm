<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Wiki extends Model
{
    use ModelTrait;

    protected $table = 'wikis';
    protected $hidden = ['project_id'];

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * relationships
     */

    public function page()
    {
        return $this->hasMany(WikiPage::class);
    }
}
