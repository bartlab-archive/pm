<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnabledModule extends Model
{
    // todo: make resister modules mechanism
    public static $modules = [
        ['name' => 'issue_tracking', 'title' => 'Issue tracking', 'enabled' => false],
        ['name' => 'time_tracking', 'title' => 'Time tracking', 'enabled' => false],
        ['name' => 'news', 'title' => 'News', 'enabled' => false],
        ['name' => 'documents', 'title' => 'Documents', 'enabled' => false],
        ['name' => 'files', 'title' => 'Files', 'enabled' => false],
        ['name' => 'wiki', 'title' => 'Wiki', 'enabled' => false],
        ['name' => 'repository', 'title' => 'Repository', 'enabled' => false],
        ['name' => 'boards', 'title' => 'Forums', 'enabled' => false],
        ['name' => 'calendar', 'title' => 'Calendar', 'enabled' => false],
        ['name' => 'gantt', 'title' => 'Gantt', 'enabled' => false],

//        'issue_tracking' => 'Issue tracking',
//        'time_tracking' => 'Time tracking',
//        'news' => 'News',
//        'documents' => 'Documents',
//        'files' => 'Files',
//        'wiki' => 'Wiki',
//        'repository' => 'Repository',
//        'boards' => 'Forums',
//        'calendar' => 'Calendar',
//        'gantt' => 'Gantt',
    ];

    public $timestamps = false;

    protected $guarded = ['id'];

//    protected $hidden = ['project_id', 'id'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
