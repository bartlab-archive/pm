<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpenIdAuthenticationAssociation extends Model
{
    protected $table = 'open_id_authentication_associations';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
