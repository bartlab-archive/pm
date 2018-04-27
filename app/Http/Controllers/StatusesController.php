<?php

namespace App\Http\Controllers;

use App\Http\Requests\Projects\IndexProjectRequest;
use App\Http\Requests\Projects\StoreProjectRequest;
use App\Http\Resources\MemberResource;
use App\Http\Resources\ModuleResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\StatusResource;
use App\Services\EnabledModulesService;
use App\Services\MembersService;
use App\Services\ProjectsService;
use App\Services\StatusesService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class ProjectController
 *
 * @property ProjectsService $projectsService
 * @property MembersService $membersService
 * @property EnabledModulesService $enabledModulesService
 *
 * @package App\Http\Controllers\Projects
 */
class StatusesController extends BaseController
{

    protected $statusesService;

    public function __construct(
        StatusesService $statusesService
    )
    {
        $this->statusesService = $statusesService;
    }

    public function index()
    {
        return StatusResource::collection(
            $this->statusesService->all()
        );
    }

    public function show($identifier)
    {
    }

    public function store(StoreProjectRequest $request)
    {
    }

    public function update($identifier)
    {
    }
}