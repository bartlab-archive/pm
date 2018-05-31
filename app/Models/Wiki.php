<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Wiki extends Model
{
    use ModelTrait;

    protected $hidden = ['project_id'];

    public $timestamps = false;

    protected $fillable = [
        'project_id',
        'start_page',
        'status'
    ];

    protected $guarded = ['id'];

    public function pages()
    {
        return $this->hasMany(WikiPage::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
