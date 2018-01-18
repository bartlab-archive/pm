<?php

namespace App\Services;

use App\Models\Document;
use App\Models\Issue;
use App\Models\IssueStatuse;
use App\Models\Journal;
use App\Models\JournalDetail;
use App\Models\Project;
use App\Models\Tracker;
use App\Models\User;
use App\Models\Wiki;
use App\Models\WikiContent;
use App\Models\WikiContentVersion;
use App\Models\WikiPage;
use Illuminate\Support\Carbon;

/**
 * Class ProjectsService
 *
 * @property AttachmentsService $attachmentsService
 * @property EnabledModulesService $enabledModulesService
 * @property ProjectTrackersService $projectTrackersService
 * @property UsersService $usersService
 *
 * @package App\Services
 */
class ProjectsService
{
    protected $attachmentsService;
    protected $enabledModulesService;
    protected $projectTrackersService;
    protected $usersService;

    /**
     * ProjectsService constructor.
     * @param AttachmentsService $attachmentsService
     * @param UsersService $usersService
     */
    public function __construct(
        AttachmentsService $attachmentsService,
        UsersService $usersService
    )
    {
        $this->attachmentsService = $attachmentsService;
        $this->usersService = $usersService;
    }

    public function all($status = null)
    {
        $projects = Project::orderBy('name')
//            ->where('status', Project::ACTIVE_STATUS)
//            ->where('is_public', Project::IS_PUBLIC)
//            ->whereNull('parent_id') // disabled recursive projects
            ->with([
                'members',
                'versions',
//                'issue_categories',
//                'repositories',
//                'boards',
//                'childProjectsRecursive', // disabled recursive projects
            ]);

		if ($status) {
			$projects->orWhere('status', $status);
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
//                'trackers',
                'enabled_modules',
//                'issue_categories',
                'versions',
//                'wiki',
//                'repositories',
                'enumerations',
                'childProjects'
            ])
            ->with(['members' => function ($query) {
                $query->with(['user', 'member_roles.roles']);
            }])
            ->with(['parentProject' => function ($query) {
                $query->with(['members' => function ($query) {
                    $query->with(['user', 'member_roles.roles']);
                }]);
            }])
//            ->with(['boards' => function ($query) {
//                $query->orderBy('position');
//            }])
//            ->with(['news' => function ($query) {
//                $query->orderBy('created_on', 'desc')->take(3);
//            }])
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

		$projectWiki = isset($data['wiki']) ? $data['wiki'] : [];
		unset($data['wiki']);

		$projectVersions =  isset($data['versions']) ? $data['versions'] : [];
		unset($data['versions']);

		$projectRepositories = isset($data['repositories']) ? $data['repositories'] : [];
		unset($data['repositories']);

		$projectNews = isset($data['news']) ? $data['news'] : [];
		unset($data['news']);

		$projectBoards = isset($data['boards']) ? $data['boards'] : [];
		unset($data['boards']);

		unset($data['enabled_modules']);
		unset($data['issue_categories']);
		unset($data['enumerations']);
		unset($data['child_projects']);
		unset($data['members']);
		unset($data['parent_project']);

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

			if (isset($data['parent_identifier'])) {
				$data['parent_id'] = Project::whereIdentifier($data['parent_identifier'])->firstOrFail()->id;
				unset($data['parent_identifier']);
			}

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
        //$project->issues()->delete();

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

    public function getActivity($projectIdentifier, $params = [])
    {
        /**
         * @var Issue $issue
         * @var User $user
         * @var Tracker $tracker
         * @var IssueStatuse $status
         * @var Journal $journal
         * @var WikiContentVersion $wiki
         * @var Project $project
         * @var JournalDetail $journalDetails
         * @var Document $document
         */

        $project = $this->one($projectIdentifier);
        $result = [];

        if (isset($params['showIssues']) && $params['showIssues']) {
            $issues = Issue::with(['journals', 'author', 'trackers', 'issueStatuse'])
                ->where('project_id', $project->id)
                ->whereBetween('created_on', [$params['start_date'] . ' 00:00:00', $params['end_date'] . ' 23:59:59'])
                ->get();
            foreach ($issues as $issue) {
                $date = new Carbon($issue->created_on);
                $user = $issue->author;
                $tracker = $issue->trackers;
                $status = $issue->issueStatuse;

                $result[$date->format('m/d/Y')]['_' . $date->format('His')][] = [
                    'type' => 'issue',
                    'time' => $date->format('h:i A'),
                    'author_id' => $issue->author_id,
                    'avatar_src' => '//www.gravatar.com/avatar/' . $user->avatar_hash . '?rating=PG&amp;size=24&amp;default=',
                    'author_name' => $user->firstname . ' ' . $user->lastname,
                    'link_ui_sref' => 'issues.info({id: ' . $issue->id . '})',
                    'link_text' => $tracker->name . ' #' . $issue->id . ' (' . $status->name . ') ' .
                        (($issue->subject && count($issue->subject) > 65) ?
                            mb_substr($issue->subject, 0, 65) . '...' : $issue->subject),
                    'description' => $issue->description ? mb_substr($issue->description, 0, 115) . '...' : null,
                ];
            }

            $tableJ = Journal::getTableName();
            $tableI = Issue::getTableName();
            $tableJD = JournalDetail::getTableName();
            $journals = Journal::select($tableJ . '.*')
                ->with(['user', 'issue', 'issue.trackers', 'issue.issueStatuse'])
                ->join($tableI, $tableI . '.id', $tableJ . '.journalized_id')
                ->join($tableJD, $tableJ . '.id', $tableJD . '.journal_id')
                ->where($tableJD . '.property', '!=', 'attachment')
                ->where($tableJ . '.journalized_type', 'Issue')
                ->where($tableI . '.id', $project->id)
                ->whereBetween($tableJ . '.created_on', [$params['start_date'] . ' 00:00:00', $params['end_date'] . ' 23:59:59'])
                ->get();

            foreach ($journals as $journal) {
                $date = new Carbon($journal->created_on);
                $issue = $journal->issue;
                $user = $journal->user;
                $tracker = $journal->issue->trackers;
                $status = $journal->issue->issueStatuse;

                $result[$date->format('m/d/Y')]['_' . $date->format('His')][] = [
                    'type' => 'issue',
                    'time' => $date->format('h:i A'),
                    'author_id' => $journal->user_id,
                    'avatar_src' => '//www.gravatar.com/avatar/' . $user->avatar_hash . '?rating=PG&amp;size=24&amp;default=',
                    'author_name' => $user->firstname . ' ' . $user->lastname,
                    'link_ui_sref' => 'issues.info({id: ' . $issue->id . '})',
                    'link_text' => $tracker->name . ' #' . $issue->id . ' (' . $status->name . ') ' .
                        (($issue->subject && count($issue->subject) > 65) ?
                            mb_substr($issue->subject, 0, 65) . '...' : $issue->subject),
                    'description' => $journal->notes ? mb_substr($issue->notes, 0, 115) . '...' : null,
                ];
            }
        }

        if (isset($params['showWiki']) && $params['showWiki']) {
            $tableWCV = WikiContentVersion::getTableName();
            $tableWP = WikiPage::getTableName();
            $tableW = Wiki::getTableName();
            $wikies = WikiContentVersion::select($tableWCV . '.*')
                ->with('author', 'wikiPage')
                ->join($tableWP, $tableWP . '.id', $tableWCV . '.page_id')
                ->join($tableW, $tableW . '.id', $tableWP . '.wiki_id')
                ->where($tableW . '.project_id', $project->id)
                ->where(function ($query) use ($params, $tableWCV) {
                    $query->whereBetween($tableWCV . '.updated_on', [$params['start_date'] . ' 00:00:00', $params['end_date'] . ' 23:59:59']);
                })->get();

            foreach ($wikies as $wiki) {
                $date = new Carbon($wiki->updated_on);
                $user = $wiki->author;

                $wikiData = explode('\n', str_replace('h1. ', '', $wiki->data))[0];
                $wikiData = mb_substr($wikiData, 0, 65);
                $result[$date->format('m/d/Y')]['_' . $date->format('His')][] = [
                    'type' => 'wiki',
                    'time' => $date->format('h:i A'),
                    'author_id' => $wiki->author_id,
                    'avatar_src' => '//www.gravatar.com/avatar/' . $user->avatar_hash . '?rating=PG&amp;size=24&amp;default=',
                    'author_name' => $user->firstname . ' ' . $user->lastname,
                    'link_ui_sref' => null,
                    'href' => '/projects/' . $projectIdentifier . '/wiki/' . $wiki->wikiPage->title,
                    'link_text' => 'Wiki edit: ' . $wikiData . ' (#' . $wiki->version . ')',
                    'link_params' => [
                        'wiki_content_versions' => $wiki->id,
                        'version_id' => $wiki->version
                    ],
                ];
            }
        }

        if (isset($params['showFiles']) && $params['showFiles']) {
            $tableJ = Journal::getTableName();
            $tableI = Issue::getTableName();
            $tableJD = JournalDetail::getTableName();
            $journals = Journal::select($tableJ . '.*')
                ->with(['user', 'issue', 'issue.trackers', 'issue.issueStatuse'])
                ->with(['journalDetails' => function ($query) use ($tableJD) {
                    $query->where($tableJD . '.property', 'attachment');
                }])
                ->join($tableI, $tableI . '.id', $tableJ . '.journalized_id')
                ->join($tableJD, $tableJ . '.id', $tableJD . '.journal_id')
                ->where($tableJD . '.property', 'attachment')
                ->where($tableJ . '.journalized_type', 'Issue')
                ->where($tableI . '.project_id', $project->id)
                ->whereBetween($tableJ . '.created_on', [$params['start_date'] . ' 00:00:00', $params['end_date'] . ' 23:59:59'])
                ->get();

            foreach ($journals as $journal) {
                $date = new Carbon($journal->created_on);
                $issue = $journal->issue;
                $user = $journal->user;
                $journalDetails = $journal->journalDetails->first();

                $result[$date->format('m/d/Y')]['_' . $date->format('His')][] = [
                    'type' => 'files',
                    'time' => $date->format('h:i A'),
                    'author_id' => $journal->user_id,
                    'avatar_src' => '//www.gravatar.com/avatar/' . $user->avatar_hash . '?rating=PG&amp;size=24&amp;default=',
                    'author_name' => $user->firstname . ' ' . $user->lastname,
                    'link_text' => $journalDetails->value,
                    'link_params' => ['file' => $journalDetails->value],
                    'description' => null,
                ];
            }
        }

        if (isset($params['showDocuments']) && $params['showDocuments']) {
            $documents = Document::where('project_id', $project->id)
                ->whereBetween('created_on', [$params['start_date'] . ' 00:00:00', $params['end_date'] . ' 23:59:59'])
                ->get();

            foreach ($documents as $document) {
                $date = new Carbon($document->created_on);
                $result[$date->format('m/d/Y')]['_' . $date->format('His')][] = [
                    'time' => $date->format('h:i A'),
                    'author_id' => null,
                    'avatar_src' => null,
                    'author_name' => null,
                    'link_text' => 'Document: ', $document->title,
                    'link_params' => ['document_id' => $document->id],
                    'description' => $document->description ? mb_substr($document->description, 0, 115) . '...' : null,
                ];
            }
        }


        return $result;
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