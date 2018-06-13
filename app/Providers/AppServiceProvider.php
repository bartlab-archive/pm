<?php

namespace App\Providers;

use App\Services\IssuesService;
use App\Services\ProjectsService;
use App\Services\SettingsService;
use App\Services\WikisService;
use Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public $singletons = [
        IssuesService::class => IssuesService::class,
        ProjectsService::class => ProjectsService::class,
        SettingsService::class => SettingsService::class,
        WikisService::class => WikisService::class,
    ];

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() !== 'production') {
            $this->app->register(IdeHelperServiceProvider::class);
        }
    }
}
