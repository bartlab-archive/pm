<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /**
     * registration admin setting constant
     */

    /**
     * @var string
     */
    const setting_register_name = 'self_registration';
    /**
     * @var integer
     */
    const self_registration_disabled = 0;
    /**
     * @var integer
     */
    const self_registration_account_activation_by_email = 1;
    /**
     * @var integer
     */
    const self_registration_automatic_account_activation = 2;

    /**
     * Table name
     * 
     * @var integer
     */
    protected $table = 'settings';
    
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $dates = [
        'updated_on',
    ];
}
