<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

/**
 * Class JournalDetail
 *
 * @property int $id
 * @property int $journal_id
 * @property string $property
 * @property string $prop_key
 * @property string $old_value
 * @property string $value
 *
 * @package App\Models
 */
class JournalDetail extends Model
{
    use ModelTrait;

    protected $table = 'journal_details';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}
