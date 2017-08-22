<?php

namespace App\Services;

use App\Models\Issue;
use App\Models\Project;


class IssuesService
{

    protected $issueService;
    protected $statusesService;
    protected $trackersService;
    protected $projectsService;
    protected $categoriesService;
    protected $enumerationsService;

    public function __construct(
        IssuesService $issueService,
        StatusesService $statusesService,
        TrackersService $trackersService,
        ProjectsService $projectsService,
        EnumerationsService $enumerationsService,
        IssueCategoriesService $categoriesService
    )
    {
        $this->issueService = $issueService;
        $this->statusesService = $statusesService;
        $this->trackersService = $trackersService;
        $this->projectsService = $projectsService;
        $this->categoriesService = $categoriesService;
        $this->enumerationsService = $enumerationsService;
    }

    public function one($id)
    {
//        $response = [
//            'projectsList' => $this->projectsService->list(),
//            'trackersList' => $this->trackersService->all(),
//            'statusesList' => $this->statusesService->all(),
//            'prioritiesList' => $this->enumerationsService->list(),
//
//        ];
        $response = [];
        $response['issue'] = Issue::where('id', $id)->with(['trackers', 'user', 'author', 'project'])->first();

//        if ($project_identifier = array_get($response, 'issue.project.identifier')) {
//            $response['project'] = $this->projectsService->one($project_identifier);
//        }

        return $response;
    }

    public function update($id, array $data)
    {
        if ($issue = Issue::where('id', $id)->firstOrFail()) {
            $issue->update($data);
            return $issue;
        }

        return false;
    }

    public function create($data)
    {
        $issue = Issue::create($data);
        return $issue;
    }

    public function all()
    {
        return Issue::limit(20)
            ->with(['trackers', 'user', 'author', 'project'])
            ->get();
    }

    public function list(string $id, $params = [])
    {
        $offset = array_get($params, 'offset', 0);

        $query = Issue::join(Project::getTableName(), Issue::getTableName() . '.project_id', '=', Project::getTableName() . '.id')
            ->select(Issue::getTableName() . '.*', Project::getTableName() . '.identifier')
            ->where(Project::getTableName() . '.identifier', $id)
            ->with(['trackers', 'user', 'author', 'project']);

        if ($statuses = array_get($params, 'status_ids', [])) {
            $query = $query->whereIn('status_id', $statuses);
        }

        if ($trackers = array_get($params, 'tracker_ids', [])) {
            $query = $query->whereIn('tracker_id', $trackers);
        }

        if ($priorities = array_get($params, 'priority_ids', [])) {
            $query = $query->whereIn('priority_id', $priorities);
        }

        $result = [
            'count' => $query->count(),
            'issues' => $query->offset($offset)->limit(20)->get()

        ];

        return $result;
    }

    public function trackers($identifier)
    {
        $bug = Issue::join(Project::getTableName(), Issue::getTableName() . '.project_id', '=', Project::getTableName() . '.id')
            ->select(Issue::getTableName() . '.*', Project::getTableName() . '.identifier')
            ->where(Project::getTableName() . '.identifier', $identifier)
            ->where('tracker_id', 6)
            ->count();

        $feature = Issue::join(Project::getTableName(), Issue::getTableName() . '.project_id', '=', Project::getTableName() . '.id')
            ->select(Issue::getTableName() . '.*', Project::getTableName() . '.identifier')
            ->where(Project::getTableName() . '.identifier', $identifier)
            ->where('tracker_id', 4)
            ->count();

        $result = [
            'bug' => $bug,
            'feature' => $feature
        ];

        return $result;
    }


//	public function getInfoFroEdit($project_if)
//	{
//		$projects = Project::select('name', 'id')->get()->toArray();
//		$user_ids = Issue::where('project_id', $project_if)->select('assigned_to_id', 'author_id')->get()->toArray();
//		$users = User::whereIn('id', $user_ids)->get()->toArray();
//		return ['projects' => $projects, 'users' => $users];
//	}
}