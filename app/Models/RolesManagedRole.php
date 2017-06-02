<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RolesManagedRole extends Model
{
    protected $table = 'roles_managed_roles';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
