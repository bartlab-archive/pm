<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Project extends Model
{
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

    public function wiki()
    {
        return $this->hasOne(Wiki::class);
    }

    public function getIsMyAttribute()
    {
        return (int)(Auth::guest() ? false : $this->members()->where('user_id', Auth::user()->id)->exists());
    }

    /**
     * Method list
     */

    /**
     * @param string $identifier
     */
    public static function projectByIdentifier(string $identifier)
    {
        return Project::where('identifier', $identifier)->firstOrFail();
    }

    public static function deleteProjectByIdentifier(string $identifier)
    {
        $project = Project::where('identifier', $identifier)->firstOrFail();

        /**
         * Destroy attach trackers
         */
        $project->trackers()->detach();

        /**
         * Destroy attach issues
         */
        Issue::destroy($project->issues->pluck('id')->toArray());

        /**
         * Destroy project
         */
        return $project->delete();
    }
}
