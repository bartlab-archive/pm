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

    public static function existsToken(string $token, string $action = 'session')
    {
        return Token::where('action', $action)
            ->where('value', $token)
            ->exists();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
