<?php

namespace App\Http\Middleware;

use Closure;

class AdminAccess
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (\Auth::guest()) {
            return abort(401);
        }

        if (!\Auth::admin()) {
            return abort(403);
        }

        return $next($request);
    }
}