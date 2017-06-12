<?php

namespace App\Http\Middleware;

use App\Models\Token;
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
        /**
         * @todo create permission by authorization user
         */
        $token = $request->bearerToken();

        if (!$token || !Token::existsToken($token, 'session') || !User::userByHeaderAuthToken($request)) {
            return abort(401);
        }

        return $next($request);
    }
}
