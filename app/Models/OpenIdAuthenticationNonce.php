<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OpenIdAuthenticationNonce extends Model
{
    protected $table = 'open_id_authentication_nonces';

    public $timestamps = false;
}
