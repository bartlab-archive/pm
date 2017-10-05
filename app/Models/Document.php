<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Document
 *
 * @property int $id
 * @property int $project_id
 * @property int $category_id
 * @property string $title
 * @property string $description
 * @property string $created_on
 *
 * @package App\Models
 */
class Document extends Model
{
    protected $table = 'documents';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
    ];
}
