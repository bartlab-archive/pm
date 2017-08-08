<?php

namespace App\Models;

use App\Traits\NestedTreeTrait;
use App\Traits\ModelTrait;
use Auth;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use NestedTreeTrait;
    use ModelTrait;

    const ACTIVE_STATUS = '1';
    const CLOSED_STATUS = '5';
    const ARCHIVED_STATUS = '9';

    protected $table = 'projects';

    protected $appends = ['is_my'];
    protected $hidden = ['is_my'];

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
        'updated_on',
    ];

    /**
     * Relationship list
     */

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function issues()
    {
        return $this->hasMany(Issue::class);
    }

    public function trackers()
    {
        return $this->belongsToMany(Tracker::class, (new ProjectsTracker())->getTable());
    }

    public function members()
    {
        return $this->hasMany(Member::class);
    }

	public function news()
	{
		return $this->hasMany(News::class, 'project_id', 'id');
	}

    public function versions()
    {
        return $this->hasMany(Version::class);
    }

    public function issue_categories()
    {
        return $this->hasMany(IssueCategory::class);
    }

    public function repositories()
    {
        return $this->hasMany(Repository::class);
    }

    public function boards()
    {
        return $this->hasMany(Board::class);
    }

    public function enabled_modules()
    {
        return $this->hasMany(EnabledModule::class);
    }

    public function wiki()
    {
        return $this->hasOne(Wiki::class);
    }
    
    public function attachments(){
        return $this->morphMany(Attachment::class, 'container');
    }
    
    public function getIsMyAttribute()
    {
        return (int)(Auth::guest() ? false : $this->members()->where('user_id', Auth::user()->id)->exists());
    }

    public function users() {
        return $this->belongsToMany(User::class, Member::getTableName());
    }

    /**
     * @param string $identifier
     */
    public static function projectByIdentifier(string $identifier)
    {
        return static::where('identifier', $identifier)->firstOrFail();
    }

    public static function deleteProjectByIdentifier(string $identifier)
    {
        $project = static::where('identifier', $identifier)->firstOrFail();

        /**
         * Destroy attach trackers
         */
        $project->trackers()->detach();

        /**
         * Destroy attach issues
         */
        $project->issues()->delete();
        Issue::destroy($project->issues->pluck('id')->toArray());

        /**
         * Destroy project
         */
        return $project->delete();
    }

	public static function getNewsByProjectIdentifier($project_identifier)
	{
		return static::projectByIdentifier($project_identifier)->news;
	}
}
