<?php

namespace App\Http\Controllers;

use App\Services\TrackersService;
use App\Services\RolesService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class TrackersController
 *
 * @property TrackersService $trackersService
 *
 * @package App\Http\Controllers\Projects
 */
class TrackersController extends BaseController
{

    /**
     * @var RolesService
     */
    protected $trackersService;

    /**
     * RolesController constructor.
     * @param TrackersService $trackersService
     */
    public function __construct(TrackersService $trackersService)
    {
        $this->trackersService = $trackersService;
    }

    /**
     * @return mixed
     */
    public function getAll()
    {
        return $this->trackersService->all();
    }

	public function getList(Request $request)
	{
		return $this->trackersService->getList($request->all());
	}
}