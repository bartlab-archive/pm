<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomFieldEnumeration extends Model
{
    protected $table = 'custom_field_enumerations';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
