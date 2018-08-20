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
class IssueStatus extends Model
{
    use ModelTrait;

    protected $casts = [
        'is_closed' => 'boolean',
    ];

    public $timestamps = false;

    protected $guarded = ['id'];

    public function issues()
    {
        return $this->hasMany(Issue::class, 'status_id', 'id');
    }
}
