<?php

namespace App\Providers;

use App\Models\Token;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app['auth']->viaRequest('userAuth', function (Request $request) {
            return app('App\Services\UsersService')
                ->userByToken($request->bearerToken(), Token::SESSION_TOKEN_ACTION);
        });

        Auth::setDefaultDriver('user_auth');

        $this->registerPolicies();
    }
}
