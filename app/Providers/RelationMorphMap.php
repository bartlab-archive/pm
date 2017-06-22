<?php

namespace App\Providers;

use App\Models\Attachment;
use App\Models\Project;
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
            Attachment::PROJECT_TYPE => Project::class,
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
