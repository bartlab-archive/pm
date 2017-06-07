<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = 'users';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
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

    public function comments()
    {
        return $this->hasMany(Comment::class, 'author_id', 'id');
    }

    public function issue()
    {
        return $this->hasMany(Comment::class, 'id', 'assigned_to_id');
    }
}
