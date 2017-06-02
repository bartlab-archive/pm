<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    const CREATED_AT = 'created_on';
    const UPDATED_AT = 'updated_on';

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'login', 'firstname', 'lastname', 'email', 'hashed_password',
    ];
    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
        'updated_on',
    ];

    public function email()
    {
        return $this->hasOne(EmailAddresses::class);
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class, 'author_id', 'id');
    }

    public function preference()
    {
        return $this->hasOne(UserPreference::class);
    }
}
