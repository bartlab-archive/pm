<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Enumeration extends Model
{
    use ModelTrait;

    const ACTIVE_ON = 1;
    const ACTIVE_OFF = 0;

    protected $table = 'enumerations';

    protected $hidden = ['project_id'];

    protected $fillable = ['name', 'position', 'is_default', 'type', 'active', 'project_id', 'parent_id', 'position_name'];

    protected $casts = [
        'is_default' => 'boolean',
        'active' => 'boolean',
    ];

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
