<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\ModelTrait;

/**
 * Class IssueStatuse
 *
 * @property int $id
 * @property string $name
 * @property bool $is_closed
 * @property int $position
 * @property int $default_done_ratio
 *
 * @package App\Models
 */
class IssueStatuse extends Model
{
    use ModelTrait;

    protected $table = 'issue_statuses';

    protected $casts = [
        'is_closed' => 'boolean',
    ];

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
