<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;

class User extends Authenticatable
{
    use ModelTrait;

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

    protected $hidden = [
//        'id',
        'hashed_password',
        'auth_source_id',
        'type',
        'identity_url',
        'salt',
        'admin'
    ];

    protected $appends = ['avatar_hash'];

    public function getAvatarHashAttribute()
    {
        return md5(strtolower(trim($this->email->address)));
    }

    public function email()
    {
        return $this->hasOne(EmailAddresses::class)->where('is_default', true);
    }

    public function additionalEmails()
    {
        return $this->hasMany(EmailAddresses::class)->where('is_default', false);
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class, 'author_id', 'id');
    }

    public function preference()
    {
        return $this->hasOne(UserPreference::class);
    }

    public function tokens()
    {
        return $this->hasMany(Token::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'author_id', 'id');
    }

    public function issues()
    {
        return $this->hasMany(Issue::class, 'assigned_to_id', 'id');
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, (new Member())->getTable(), 'user_id', 'project_id');
    }
}
