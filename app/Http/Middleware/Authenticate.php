<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $auth_token = $request->header('Authorization');
        $auth_token = explode(' ', $auth_token);

        if (!$auth_token || !isset($auth_token[1]) || !User::checkAuthToken($auth_token[1])) {
            return abort(401);
        }

        return $next($request);
    }
}
