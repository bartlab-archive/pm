<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User
 *
 * @property string $login
 * @property string $hashed_password
 * @property string $firstname
 * @property string $lastname
 * @property string $last_login_on
 * @property string $language
 * @property string $created_on
 * @property string $updated_on
 * @property string $identity_url
 * @property string $type
 * @property string $mail_notification
 * @property string $salt
 * @property string $passwd_changed_on
 * @property string $avatar_hash
 * @property bool $admin
 * @property bool $must_change_passwd
 * @property int $id
 * @property int $status
 * @property int $auth_source_id
 *
 * @package App\Models
 */
class User extends Authenticatable
{
    use ModelTrait;

    const CREATED_AT = 'created_on';
    const UPDATED_AT = 'updated_on';

    public $timestamps = true;

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

    protected $appends = ['avatar'];

    public function email()
    {
        return $this->hasOne(EmailAddress::class)->where('is_default', true);
    }

    public function additionalEmails()
    {
        return $this->hasMany(EmailAddress::class)->where('is_default', false);
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

    public function projects()
    {
        return $this->belongsToMany(Project::class, Member::getTableName());
    }

    public function getAvatarAttribute(){
        // todo: need check system config for avatar src
        return '//www.gravatar.com/avatar/'.md5(strtolower(trim($this->email->address)));
    }
}
