<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\SettingResource;
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

    private $settingService;

    public function __construct(SettingsService $settingService)
    {
        $this->settingService = $settingService;
    }

    public function index()
    {
//        return SettingResource::collection(
//            $this->settingService->all()
//        );
    }

    public function show($name)
    {
        // todo: filter available setting
        return SettingResource::make(
            $this->settingService->one($name)
        );
    }
}