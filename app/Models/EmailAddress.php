<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class EmailAddress extends Model
{
    use ModelTrait;

    const CREATED_AT = 'created_on';
    const UPDATED_AT = 'updated_on';

    public $timestamps = true;

    protected $guarded = ['id'];

    protected $casts = [
        'is_default' => 'boolean',
        'notify' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
