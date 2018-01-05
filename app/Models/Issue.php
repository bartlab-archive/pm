<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;

/**
 * Class Issue
 *
 * @property int $id
 * @property int $tracker_id
 * @property int $project_id
 * @property int $category_id
 * @property int $status_id
 * @property int $assigned_to_id
 * @property int $priority_id
 * @property int $fixed_version_id
 * @property int $author_id
 * @property int $lock_version
 * @property int $done_ratio
 * @property int $parent_id
 * @property int $root_id
 * @property int $lft
 * @property int $rgt
 * @property string $subject
 * @property string $description
 * @property string $due_date
 * @property string $created_on
 * @property string $updated_on
 * @property string $start_date
 * @property string $closed_on
 * @property float $estimated_hours
 * @property bool $is_private
 *
 * @package App\Models
 */
class Issue extends Model
{
    use ModelTrait;

    protected $table = 'issues';

    const CREATED_AT = 'created_on';
    const UPDATED_AT = 'updated_on';

//    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $hidden = ['project_id'];

    protected $dates = [
        'created_on',
        'updated_on',
        'closed_on'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'assigned_to_id');
    }

    public function author()
    {
        return $this->hasOne(User::class, 'id', 'author_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function tracker()
    {
        return $this->hasOne(Tracker::class, 'id', 'tracker_id');
    }

    public function journals()
    {
        return $this->hasMany(Journal::class, 'journalized_id', 'id')->where('journalized_type', 'Issue');
    }

    public function status()
    {
        return $this->hasOne(IssueStatuse::class, 'id', 'status_id');
    }

    public function priority()
    {
        return $this->hasOne(Enumeration::class, 'id', 'priority_id')->where('type', 'IssuePriority');
    }

    public function childIssues()
    {
        return $this->hasMany(self::class, 'parent_id', 'id');
    }

    public function watchers()
    {
        return $this->hasMany(Watcher::class, 'watchable_id', 'id')->where('watchable_type', 'Issue');
    }
}
