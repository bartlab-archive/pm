<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    protected $apiNamespace = 'App\Http\Controllers\Api';

    protected $botNamespace = 'App\Http\Controllers\Bot';

    protected $botUserAgent = [
        'TelegramBot'
    ];

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        // todo: make all route patters
        Route::pattern('identifier', '[a-z][a-z0-9-_]{0,99}');
        Route::pattern('id', '[0-9]{0,11}');
//        Route::pattern('wiki', '[^,./?;:|]+');

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();
        if (!$this->mapBotRoutes()) {
            $this->mapWebRoutes();
        }
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->apiNamespace)
            ->group(base_path('routes/api.php'));
    }

    protected function mapBotRoutes()
    {
        if (preg_match('/' . implode('|', $this->botUserAgent) . '/i', \Request::header('User-Agent'))) {
            Route::namespace($this->botNamespace)
                ->group(base_path('routes/bot.php'));

            return true;
        }

        return false;
    }
}
