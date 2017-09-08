<?php

namespace App\Services;

use App\Models\Project;

/**
 * Class ProjectsService
 *
 * @property AttachmentsService $attachmentsService
 * @property EnabledModulesService $enabledModulesService
 * @property ProjectTrackersService $projectTrackersService
 *
 * @package App\Services
 */
class ProjectsService
{
    protected $attachmentsService;
    protected $enabledModulesService;
    protected $projectTrackersService;

    public function __construct(AttachmentsService $attachmentsService)
    {
        $this->attachmentsService = $attachmentsService;
    }

    public function all($isClosed = null)
    {
        $projects = Project::orderBy('name')
            ->where('status', Project::ACTIVE_STATUS)
            ->where('is_public', Project::IS_PUBLIC)
            ->with([
                'members',
                'versions',
                'issue_categories',
                'repositories',
                'boards',
            ]);

        if ($isClosed) {
            $projects->orWhere('status', Project::CLOSED_STATUS);
        }

        return $projects->get()->makeVisible(['is_my']);
    }

    /**
     * @return mixed
     */
    public function list()
    {
        return Project::select('id', 'name')->get();
    }

    public function one($identifier)
    {
        return Project::whereIdentifier($identifier)
            ->with([
                'trackers',
                'enabled_modules',
                'issue_categories',
                'versions',
                'wiki',
                'repositories',
                'enumerations',
                'childProjects'
            ])
            ->with(['members' => function ($query) {
                $query->with(['users', 'member_roles.roles']);
            }])
            ->with(['parentProject' => function ($query) {
                $query->with(['members' => function ($query) {
                    $query->with(['users', 'member_roles.roles']);
                }]);
            }])
            ->with(['boards' => function ($query) {
                $query->orderBy('position');
            }])
            ->firstOrFail();
    }

    public function create($data)
    {
        if (isset($data['parent_identifier'])) {
            $parentProject = $this->one($data['parent_identifier']);
            $data['parent_id'] = $parentProject->id;
            unset($data['parent_identifier']);
        }

        $projectModules = isset($data['modules']) ? $data['modules'] : [];
        unset($data['modules']);

        $projectTrackers = isset($data['trackers']) ? $data['trackers'] : [];
        unset($data['trackers']);

        $project = Project::create($data);

        $this->enabledModulesService = app('App\Services\EnabledModulesService');
        $this->enabledModulesService->massCreate($project->id, $projectModules);
        $this->projectTrackersService = app('App\Services\ProjectTrackersService');
        $this->projectTrackersService->massCreate($project->id, $projectTrackers);

        return $project;
    }

    public function update($identifier, $data)
    {
        $project = Project::whereIdentifier($identifier)->firstOrFail();
        $data['parent_id'] = Project::whereIdentifier($data['parent_identifier'])->firstOrFail()->id;
        unset($data['parent_identifier']);
        $project->update($data);
        return $project;
    }

    public function delete($identifier)
    {
        $project = Project::whereIdentifier($identifier)->firstOrFail();

        /**
         * Destroy attach trackers
         */
        $project->trackers()->detach();

        /**
         * Destroy attach issues
         */
        $project->issues()->delete();

        /**
         * Destroy project
         */
        return $project->delete();
    }

    public function getAttachments($identifier)
    {
        $project = Project::whereIdentifier($identifier)->first();
        if ($project) {
            return $project->attachments;
        }
        return collect();
    }

    public function getAttachmentPath($id)
    {
        return $this->attachmentsService->getFullFilePath($id);
    }

//    public function getIssues($identifier, $request)
//    {
//        return [
//            'projects' => Project::where('identifier', $identifier)
//                ->with(array('issues.user', 'issues.trackers',
//                    'issues' => function ($query) use ($request) {
//                        $query->limit(array_get($request, 'limit'));
//                        $query->offset(array_get($request, 'offset'));
//                        if (!empty(array_get($request, 'sortField'))) {
//                            $query->orderBy(array_get($request, 'sortField'), array_get($request, 'order'));
//                        }
//                    }))
//                ->get()
//                ->toArray(),
//            'total' => Project::where('identifier', $identifier)->first()->issues()->count()
//        ];
//    }
}