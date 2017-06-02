<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomFieldsRole extends Model
{
    protected $table = 'custom_fields_roles';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
