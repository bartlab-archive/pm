<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = 'users';

    /**
     * Auto create timestamp
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * The name of the "created on" column.
     *
     * @var string
     */
    const CREATED_AT = 'created_on';

    /**
     * The name of the "updated on" column.
     *
     * @var string
     */
    const UPDATED_AT = 'updated_on';
    
    protected $guarded = ['id'];

    public static function userByHeaderAuthToken(Request $request)
    {
        return Token::where('action', 'session')
            ->where('value', $request->bearerToken())
            ->first()
            ->user;
    }
    
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

    public function session_token()
    {
        return $this->hasOne(Token::class);
    }
}
