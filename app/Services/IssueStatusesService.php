<?php

namespace App\Services;

use App\Models\Issue;
use App\Models\IssueStatus;
use App\Models\Journal;
use App\Models\Project;
use App\Models\Tracker;
use Illuminate\Support\Facades\Auth;

/**
 * Class IssueStatusesService
 *
 * JournalsService $journalsService
 * JournalDetailsService $journalDetailsService
 * ProjectsService $projectsService
 *
 * @package App\Services
 */
class IssueStatusesService
{
    public function getList()
    {
        return IssueStatus::all();
    }

}