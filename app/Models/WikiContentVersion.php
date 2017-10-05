<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

/**
 * Class WikiContentVersion
 *
 * @property int $id
 * @property int $wiki_content_id
 * @property int $page_id
 * @property int $author_id
 * @property int $version
 * @property string $data
 * @property string $compression
 * @property string $comments
 * @property string $updated_on
 *
 * @package App\Models
 */
class WikiContentVersion extends Model
{
    use ModelTrait;

    protected $table = 'wiki_content_versions';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    protected $dates = [
        'updated_on',
    ];

    public function author()
    {
        return $this->hasOne(User::class, 'id', 'author_id');
    }

    public function wikiPage()
    {
        return $this->hasOne(WikiPage::class, 'id', 'page_id');
    }
}
