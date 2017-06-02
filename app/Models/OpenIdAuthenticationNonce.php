<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpenIdAuthenticationNonce extends Model
{
    protected $table = 'open_id_authentication_nonces';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
