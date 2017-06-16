<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Project extends Model
{
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
     * @param null $p_id
     * @param int $count
     * @return int|mixed
     */
    public static function refreshNestedTree($p_id = null, $count = 0)
    {
        $list = Project::where('parent_id',$p_id)->get();
        $parent = Project::where('id',$p_id)->first();
        $count += $parent ? count($list) : 0;

        $rgt = null;

        foreach ($list as $n => $project) {
            $lft = $parent ? $parent->rgt : $rgt + 1;

            $count += static::refreshNestedTree($project->id, $count);

            $project->rgt = $rgt ? $rgt + ($count * 2) + 2 : ($count * 2) + ($parent ? $parent->rgt - 1 : $project->lft + 1);
            $project->lft = $lft;

            $rgt = $project->rgt;
            $project->save();
        }

        return $list->count();
    }


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $last_project = static::orderBy('id', 'desc')->first();

            $model->lft = $model->lft ? $model->lft : $last_project ? $last_project->rgt + 1 : 1;
            $model->rgt = $model->rgt ? $model->rgt : $last_project ? $last_project->rgt + 2 : 2;
        });
    }

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
    
	public function news ()
	{
		return $this->hasMany(News::class, 'project_id', 'id');
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
    
	public static function getNewsByProjectIdentifier($project_identifier)
	{
		return Project::projectByIdentifier($project_identifier)->news;
	}
}
