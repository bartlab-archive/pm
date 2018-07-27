<?php

namespace App\Http\Controllers\Bot;

use App\Services\EnabledModulesService;
use App\Services\IssuesService;
use App\Services\ProjectsService;
use App\Services\UsersService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class IssuesController
 *
 * @property IssuesService $issuesService
 * @property ProjectsService $projectsService
 * @property EnabledModulesService $enabledModulesService
 *
 * @package App\Http\Controllers
 */
class IssuesBotController extends BaseController
{
    protected $issuesService;
    protected $projectsService;
    protected $enabledModulesService;
    protected $usersService;

    public function __construct(
        IssuesService $issuesService,
        ProjectsService $projectsService,
        EnabledModulesService $enabledModulesService,
        UsersService $usersService
    )
    {
        $this->issuesService = $issuesService;
        $this->projectsService = $projectsService;
        $this->enabledModulesService = $enabledModulesService;
        $this->usersService = $usersService;
    }

    protected function checkProject($identifier, $abort = true)
    {
        // check that the project exists
        if (!$project = $this->projectsService->oneByIdentifier($identifier)) {
            return $abort ? abort(404) : false;
        }

        // check project status
        if ($project->isArchived()) {
            return $abort ? abort(403) : false;
        }

        // check module status for project
        if (!$this->enabledModulesService->check($project->id, $this->issuesService::MODULE_NAME)) {
            return $abort ? abort(403) : false;
        }

        if (!($group = $this->usersService->groupBots()) || !$this->projectsService->isMember($project->id, [$group->id])) {
            return $abort ? abort(403) : false;
        }

        return $project;
    }

    public function show($id)
    {
        if (!$issue = $this->issuesService->one($id)) {
            abort(404);
        }

        if (!$issue->project_id || !$issue->project) {
            abort(403);
        }

        $this->checkProject($issue->project->identifier);

        return view('bot', [
            'title' => $issue->project->name . ' - Issue',
            'description' => '#' . $issue->id . ': ' . $issue->subject
        ]);
    }
}
