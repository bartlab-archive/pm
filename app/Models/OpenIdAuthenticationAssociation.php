<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OpenIdAuthenticationAssociation extends Model
{
    protected $table = 'open_id_authentication_associations';

    public $timestamps = false;
}
