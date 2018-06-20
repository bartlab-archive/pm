<?php

namespace App\Models;

use App\Traits\ReferenceTrait;
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
    use ModelTrait, ReferenceTrait;

    const CREATED_AT = 'created_on';
    const UPDATED_AT = 'updated_on';

    const ENUMERATION_PRIORITY = 'IssuePriority';
//    const WATCHABLE_TYPE = 'Issue';

    protected $guarded = [
        'id'
    ];

    protected $hidden = [
        'project_id'
    ];

    protected $dates = [
        'created_on',
        'updated_on',
        'closed_on'
    ];

    protected $fillable = [
        'tracker_id',
        'project_id',
        'subject',
        'description',
        'due_date',
        'category_id',
        'status_id',
        'assigned_to_id',
        'priority_id',
        'fixed_version_id',
        'author_id',
        'lock_version',
//        'created_on',
//        'updated_on',
        'start_date',
        'done_ratio',
        'estimated_hours',
        'parent_id',
//        'root_id',
//        'lft',
//        'rgt',
        'is_private',
        'closed_on'
    ];

    public function assigned()
    {
        return $this->belongsTo(User::class, 'assigned_to_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function tracker()
    {
        return $this->belongsTo(Tracker::class);
    }

//    public function journals()
//    {
//        return $this
//            ->hasMany(Journal::class, 'journalized_id', 'id')
//            ->where('journalized_type', 'Issue');
//    }

    public function status()
    {
        return $this->belongsTo(IssueStatus::class);
    }

    public function category()
    {
        return $this->belongsTo(IssueCategory::class);
    }

    public function priority()
    {
        return $this
            ->belongsTo(Enumeration::class, 'priority_id', 'id')
            ->where('type', static::ENUMERATION_PRIORITY);
    }

    public function child()
    {
        return $this->hasMany(self::class, 'parent_id', 'id');
    }

    public function watchers()
    {
        return $this->morphToMany(User::class, 'watchable', Watcher::getTableName(), 'watchable_id');
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'container');
    }

    public function journals()
    {
        return $this->morphMany(Journal::class, 'journalized');
    }

//    public function watchable(){
//        return $this
//    }

    public function version()
    {
        return $this->belongsTo(Version::class, 'fixed_version_id');
    }
}
