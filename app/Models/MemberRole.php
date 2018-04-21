<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class MemberRole extends Model
{
    use ModelTrait;

    public $timestamps = false;

    protected $guarded = ['id'];

//    protected $hidden = [
//        'id'
//    ];

//    protected $visible = [
//        'id',
//        'name'
//    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
//    public function roles()
//    {
//        return $this->hasOne(Role::class, 'id', 'role_id');
//    }
}
