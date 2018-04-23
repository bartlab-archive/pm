<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;

class Member extends Model
{
    use ModelTrait;

//    protected $hidden = [
//        'id',
//        'user_id',
//        'project_id'
//    ];

    const CREATED_AT = 'created_on';
    const UPDATED_AT = null;

    public $timestamps = true;

    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, MemberRole::getTableName());
    }
}
