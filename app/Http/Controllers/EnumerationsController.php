<?php

namespace App\Http\Controllers;

use App\Services\EnumerationsService;
use App\Services\RolesService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class EnumerationsController
 *
 * @property EnumerationsService $enumerationsService
 *
 * @package App\Http\Controllers\Projects
 */
class EnumerationsController extends BaseController
{

    /**
     * @var RolesService
     */
    protected $enumerationsService;

    /**
     * RolesController constructor.
     * @param EnumerationsService $enumerationsService
     */
    public function __construct(EnumerationsService $enumerationsService)
    {
        $this->enumerationsService = $enumerationsService;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getList(Request $request)
    {
        return $this->enumerationsService->all($request->all());
    }
}