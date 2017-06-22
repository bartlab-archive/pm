<?php

namespace App\Providers;

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
            return self::userByAuthToken($request->bearerToken());
        });

        Auth::setDefaultDriver('user_auth');

        $this->registerPolicies();
    }

    public static function userByAuthToken($token)
    {
        return User::whereHas('session_token', function($q) use($token) {
            $q->where('action', 'session')
                ->where('value', $token);
        })->first();
    }
}
