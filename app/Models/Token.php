<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Token extends Model
{
    use ModelTrait;

//    const SESSION_TOKEN_ACTION = 'session';
//    const PASSWORD_RESET_TOKEN_ACTION = 'reset_password';

    const CREATED_AT = 'created_on';
    const UPDATED_AT = 'updated_on';

    public $timestamps = true;

    protected $guarded = ['id'];

//    public static function existsToken(string $token, string $action = 'session')
//    {
//        return static::where('action', $action)
//            ->where('value', $token)
//            ->exists();
//    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

//    public static function apiKey(User $user)
//    {
//        return static::where('user_id', $user->id)
//            ->where('action', 'api')
//            ->first();
//    }
//
//    public static function createApiKey(User $user)
//    {
//        return static::create([
//            'action' => 'api',
//            'user_id' => $user->id,
//            'value' => sha1(str_random(33))
//        ]);
//    }
//
//    public static function atomKey(User $user)
//    {
//        return static::where('user_id', $user->id)
//            ->where('action', 'feeds')
//            ->first();
//    }
//
//    public static function createAtomKey(User $user)
//    {
//        return static::create([
//            'action' => 'feeds',
//            'user_id' => $user->id,
//            'value' => sha1(str_random(33))
//        ]);
//    }
}
