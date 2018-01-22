<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Version extends Model
{
    use ModelTrait;

    protected $fillable = ['project_id', 'name', 'description', 'effective_date', 'wiki_page_title', 'status', 'sharing'];

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
        'updated_on',
    ];
}
