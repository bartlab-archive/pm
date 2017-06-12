<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Core\BaseController\BaseController;
use App\Models\Project;

/**
 * Class ProjectController
 *
 * @package App\Http\Controllers\Projects
 */
class ProjectController extends BaseController
{
    /**
     * @return mixed
     */
    protected function getModelClass()
    {
        return Project::class;
    }

    /**
     * @return mixed
     */
    public function index()
    {
        $request = request();

        $this->validate($request, $this->rules()['index'], $this->messages()['index']);

        $projects = Project::orderBy('name')->where('status', 1);

        if ($request->input('closed')) {
            $projects->orWhere('status', 5);
        }

        $projects = $projects->get();

        return response($projects)->withHeaders([
            'X-Total' => $projects->count()
        ]);
    }

    public function show($identifier)
    {
        $project = Project::where('identifier', $identifier)->first();

        if (is_null($project)) {
            return response(null, 400);
        }

        return $project;
    }

    protected function rules()
    {
        return [
            'index' => [
                'closed' => 'boolean'
            ]
        ];
    }

    protected function messages()
    {
        return [
            'index' => []
        ];
    }
}