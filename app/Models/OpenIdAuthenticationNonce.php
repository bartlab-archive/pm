<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpenIdAuthenticationNonce extends Model
{
    public $timestamps = false;

    protected $guarded = ['id'];
}
