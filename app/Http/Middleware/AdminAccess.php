<?php

namespace App\Http\Middleware;

use App\Services\UsersService;
use Closure;
use Auth;

class AdminAccess {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::guest()) {
            return abort(401);
        }

        if (! Auth::user()->admin) {
            return abort(403);
        }

        return $next($request);
    }
}