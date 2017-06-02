<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailAddresses extends Model
{
    protected $table = 'email_addresses';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
        'updated_on',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
