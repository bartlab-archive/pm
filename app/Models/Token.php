<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    protected $table = 'tokens';

    /**
     * Auto create timestamp
     *
     * @var bool
     */
    public $timestamps = true;

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
    const UPDATED_AT = 'updated_on';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
