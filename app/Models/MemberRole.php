<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MemberRole extends Model
{
    protected $table = 'member_roles';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function roles()
    {
        return $this->hasOne(Role::class, 'id', 'role_id');
    }
}
