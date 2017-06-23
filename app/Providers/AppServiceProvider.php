<?php

namespace App\Providers;

use App\Interfaces\AccountServiceInterface;
use App\Interfaces\AuthServiceInterface;
use App\Interfaces\TokenServiceInterface;
use App\Interfaces\UsersServiceInterface;
use App\Services\AccountService;
use App\Services\AuthService;
use App\Services\TokenService;
use App\Services\UsersService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
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
        $this->app->bind(
            AuthServiceInterface::class,
            AuthService::class
        );

        $this->app->bind(
            UsersServiceInterface::class,
            UsersService::class
        );

        $this->app->bind(
            AccountServiceInterface::class,
            AccountService::class
        );

        $this->app->bind(
            TokenServiceInterface::class,
            TokenService::class
        );
    }
}
