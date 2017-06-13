<?php

namespace App\Http\Middleware;

use App\Models\Token;
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
        if (!$request->bearerToken()) {
            return abort(401);
        }

        return $next($request);
    }
}
