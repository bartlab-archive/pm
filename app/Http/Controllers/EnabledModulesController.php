<?php

namespace App\Http\Controllers;

use App\Http\Resources\ModuleResource;
use App\Services\EnabledModulesService;
use App\Services\ProjectsService;
use Illuminate\Http\Request;

class EnabledModulesController extends Controller
{
    protected $enabledModulesService;
    protected $projectsService;

    public function __construct(
        EnabledModulesService $enabledModulesService,
        ProjectsService $projectsService
    )
    {
        $this->enabledModulesService = $enabledModulesService;
        $this->projectsService = $projectsService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
//        if (($projectIdentifier = $request->get('project_identifier')) && !$this->projectsService->one($projectIdentifier)) {
//            abort(404);

        /*
         * todo:
         * Need check:
         *  - is user allow to view modules by project
         *  - project status
         */
//        }
        return ModuleResource::collection(
            $this->enabledModulesService->availableList()
        );

//        return ModuleResource::collection(
//            $this->enabledModulesService->{$projectIdentifier ? 'getEnabledByProject' : 'availableList'}($projectIdentifier)
//        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
//    public function create()
//    {
    //
//    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
//    public function store(Request $request)
//    {
    //
//    }

    /**
     * Display the specified resource.
     */
//    public function show($identifier)
//    {
//        if (!$this->projectsService->one($identifier)) {
//            abort(404);
//        }
//
//        return ModuleResource::collection(
//            $this->enabledModulesService->getEnabledByProject($identifier)
//        );
//    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
//    public function edit($id)
//    {
    //
//    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $identifier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $identifier)
    {
        $this->enabledModulesService->update($identifier, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
//    public function destroy($id)
//    {
    //
//    }
}
