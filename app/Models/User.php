<?php

namespace App\models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    const CREATED_AT = 'created_on';
    const UPDATED_AT = 'updated_on';

    protected $table = 'users';
    protected $guarded = ['id'];
}
