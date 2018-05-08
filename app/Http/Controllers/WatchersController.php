<?php

namespace App\Http\Controllers;

use App\Services\WatchersService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class TrackersController
 *
 * @property WatchersService $watchersService
 * @package App\Http\Controllers\Projects
 */
class WatchersController extends BaseController
{

    /**
     * @var WatchersService
     */
    protected $watchersService;

    /**
     * RolesController constructor.
     * @param WatchersService $watchersService
     */
    public function __construct(WatchersService $watchersService)
    {
        $this->watchersService = $watchersService;
    }

    public function create($type, $id)
    {
        // todo: make more clean input for watchable_type
        return $this->watchersService->create(
            [
                'watchable_id' => $id,
                'watchable_type' => $type,
                'user_id' => \Auth::id()
            ]
        );

    }

    public function delete($type, $id)
    {
        // todo: refactor
        return $this->watchersService->delete($id, $type, \Auth::id());
    }
}