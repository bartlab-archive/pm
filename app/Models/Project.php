<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;
use App\Traits\NodeTrait;
use Illuminate\Support\Facades\Auth;

class Project extends Model
{
    use ModelTrait;
//    use NodeTrait;

    const STATUS_ACTIVE = '1';
    const STATUS_CLOSED = '5';
    const STATUS_ARCHIVED = '9';
    const IS_PUBLIC = '1';

//    protected $hidden = [
//        'id',
//        'parent_id',
//        'lft',
//        'rgt'
//    ];

    protected $casts = [
        'is_public' => 'boolean',
        'inherit_members' => 'boolean'
    ];

    protected $appends = [
        'is_my'
    ];

    public $timestamps = false;

    protected $guarded = [
        'id'
    ];

    protected $dates = [
        'created_on',
        'updated_on',
    ];

    protected $fillable = [
        'id',
        'name',
        'description',
        'homepage',
        'is_public',
        'parent_id',
//        'created_on',
//        'updated_on',
        'identifier',
        'status',
//        'lft',
//        'rgt',
        'inherit_members',
//        'default_version_id',
    ];

    protected $perPage = 20;

    /**
     * Project trackers
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function trackers()
    {
        return $this->belongsToMany(Tracker::class, ProjectsTracker::getTableName());
    }

    public function versions()
    {
        return $this->hasMany(Version::class);
    }

    public function enumerations()
    {
        return $this->hasMany(Enumeration::class);
    }

    public function enabledModules()
    {
        return $this->hasMany(EnabledModule::class);
    }

    public function members()
    {
//        return $this->belongsToMany(User::class, Member::getTableName());
        return $this->hasMany(Member::class);
    }

    public function parent()
    {
        return $this->hasOne(self::class, 'id', 'parent_id');
    }

    // todo: remove from model
    public function getIsMyAttribute()
    {
        return (Auth::guest() ? false : $this->members()->where('user_id', Auth::user()->id)->exists());
    }
}
