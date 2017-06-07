<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Token extends Model
{
    protected $table = 'tokens';

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

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function checkHeaderAuthToken(Request $request)
    {
        $auth_token = $request->header('Authorization');
        $auth_token = explode(' ', $auth_token);

        if (!$auth_token || !isset($auth_token[1])) {
            return false;
        }

        return Token::where('action', 'session')->where('value', $auth_token[1])->exists();
    }

    public static function apiKey(User $user)
    {
        return Token::where('user_id', $user->id)
            ->where('action', 'api')
            ->first();
    }

    public static function createApiKey(User $user)
    {
        return Token::create([
            'action' => 'api',
            'user_id' => $user->id,
            'value' => sha1(str_random(33))
        ]);
    }

    public static function atomKey(User $user)
    {
        return Token::where('user_id', $user->id)
            ->where('action', 'feeds')
            ->first();
    }

    public static function createAtomKey(User $user)
    {
        return Token::create([
            'action' => 'feeds',
            'user_id' => $user->id,
            'value' => sha1(str_random(33))
        ]);
    }
}
