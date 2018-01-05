<?php

namespace App\Http\Middleware;

use App\Services\EnabledModulesService;
use Closure;
use Auth;

class Module
{

    protected $enabledModulesService;

    public function __construct(EnabledModulesService $enabledModulesService)
    {
        $this->enabledModulesService = $enabledModulesService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $name
     * @return mixed
     */
    public function handle($request, Closure $next, $name)
    {
        /**
         * @todo create permission by authorization user
         */

//        if (Auth::guest()) {
//            return abort(401);
//        }
//        return abort(422);
        if ($projectIdentifier = $request->get('project_identifier')) {
            if (!$this->enabledModulesService->check($projectIdentifier,$name)){
                return abort(422);
            }
        }

        return $next($request);
    }
}
