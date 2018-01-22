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

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $dates = [
        'created_on',
    ];

    public function journalDetails()
    {
        return $this->hasMany(JournalDetail::class, 'journal_id', 'id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function issue()
    {
        return$this->belongsTo(Issue::class, 'journalized_id', 'id');
    }
}
