<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Journal
 *
 * @property int $id
 * @property int $journalized_id
 * @property int $user_id
 * @property string $journalized_type
 * @property string $notes
 * @property string $created_on
 * @property bool $private_notes
 *
 * @package App\Models
 */
class Journal extends Model
{
    use ModelTrait;

//    public $timestamps = true;

    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
    ];

    protected $fillable = [
        'user_id',
        'notes',
        'private_notes'
    ];

    protected $casts = [
        'private_notes' => 'boolean',
    ];

    const CREATED_AT = 'created_on';
    const UPDATED_AT = null;

    public function details()
    {
        return $this->hasMany(JournalDetail::class);
    }

    public function journalized()
    {
        return $this->morphTo('journalized');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
