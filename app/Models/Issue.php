<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;

class Issue extends Model
{

    use ModelTrait;

    protected $table = 'issues';
	
	const NEW_STATUS = '1';
	const IN_PROGRESS_STATUS = '2';
	const RESOLVED_STATUS = '3';
	const FEEDBACK_STATUS = '4';
	const CLOSED_STATUS = '5';
	const REJECTED_STATUS = '6';
	const CREATED_AT = 'created_on';
	const UPDATED_AT = 'updated_on';
	
	const LOW_PRIORITY = '1';
	const LOW_NORMAL = '2';
	const LOW_HIGH = '3';
    
//    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
        'updated_on',
        'closed_on'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'assigned_to_id', 'id');
    }

    public function author()
    {
        return $this->hasOne(User::class, 'id', 'author_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
	
	public function trackers()
	{
		return $this->hasOne(Tracker::class, 'id', 'tracker_id');
	}
}
