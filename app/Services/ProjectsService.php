<?php

namespace App\Services;

use App\Models\Project;

class ProjectsService
{
    public function __construct(AttachmentsService $attachmentsService)
    {
        $this->attachmentsService = $attachmentsService;
    }

    public function all($isClosed = null)
    {
        $projects = Project::orderBy('name')
            ->where('status', Project::ACTIVE_STATUS)
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
            ->with(['trackers', 'enabled_modules', 'users', 'issue_categories'])->first();
    }

    public function create($data)
    {
        return Project::create($data);
    }

    public function update($identifier, $data)
    {
        $project = Project::whereIdentifier($identifier)->firstOrFail();
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