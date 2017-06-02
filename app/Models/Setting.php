<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /**
     * register admin setting constant
     */

    const setting_register_name = 'self_registration';
    const self_registration_disabled = 0;
    const self_registration_account_activation_by_email = 1;
    const self_registration_automatic_account_activation = 2;

    protected $table = 'settings';

    public $timestamps = false;
}
