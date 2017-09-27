<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wiki extends Model
{
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
