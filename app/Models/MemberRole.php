<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MemberRole extends Model
{
    public $timestamps = false;

    protected $guarded = ['id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function roles()
    {
        return $this->hasOne(Role::class, 'id', 'role_id');
    }
}
