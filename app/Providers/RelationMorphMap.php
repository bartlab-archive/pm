<?php

namespace App\Providers;

use App\Models\Attachment;
use App\Models\Issue;
use App\Models\Project;
use App\Models\WikiPage;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class RelationMorphMap extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Relation::morphMap([
            'Project' => Project::class,
            'Issue' => Issue::class,
            'WikiPage' => WikiPage::class,
        ]);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
