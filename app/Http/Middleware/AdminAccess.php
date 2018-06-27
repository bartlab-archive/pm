<?php

namespace App\Http\Middleware;

use App\Services\UsersService;
use Closure;
use Auth;

class AdminAccess {

    public function __construct(UsersService $userService)
    {
        $this->userService = $userService;
    }

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

        if($this->userService->one(Auth::id())->admin !== 1) {
            return abort(403);
        }

        return $next($request);
    }
}