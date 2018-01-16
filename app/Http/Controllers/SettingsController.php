<?php

namespace App\Http\Controllers;

use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class SettingsController
 *
 * @property SettingsController $statusesService
 *
 */
class SettingsController extends BaseController
{
    /**
     * Statuses constructor.
     * @param StatusesService $statusesService
     */
    public function __construct(SettingsService $settingService)
    {
        $this->settingService = $settingService;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getList(Request $request)
    {
        return $this->settingService->getList($request->all());
    }
}