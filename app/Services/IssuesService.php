<?php

namespace App\Services;

use App\Models\Attachment;
use App\Models\Issue;
use App\Models\IssueCategory;
use App\Models\IssueStatus;
use App\Models\Journal;
use \Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

/**
 * Class IssuesService
 *
 * @package App\Services
 */
class IssuesService
{
    const MODULE_NAME = 'issue_tracking';

    public function all(array $params = [])
    {
        $query = Issue::with([
            'attachments.author',
            'tracker',
            'project',
//            'project.members',
            'project.members.user',
            'project.members.roles',
            'project.trackers',
            'assigned',
            'author',
            'status',
            'version',
            'category',
            'priority',
            'watchers'
        ]);

        // todo: check for private issue status by roles

        if ($project = array_get($params, 'project_identifier')) {
            $query->whereHas('project', function ($query) use ($project) {
                /** @var $query Builder */
                $query->where('identifier', $project);
            });
        } else {
            /*
             * todo
             * Need add to where:
             *  - is module enambled for project
             *  - is user allow to view issue
             *  - project status
             */
        }

        // filter by member
        if ($userIds = array_get($params, 'user_ids')) {
            $query->whereHas('project.members', function ($query) use ($userIds) {
                /** @var $query Builder */
                $query->whereIn('user_id', $userIds);
            });
        }

        if ($statuses = array_get($params, 'status_ids')) {
            $query->whereIn('status_id', (array)$statuses);
        }

        if ($trackers = array_get($params, 'tracker_ids')) {
            $query->whereIn('tracker_id', (array)$trackers);
        }

        if ($assigned_to_id = array_get($params, 'assigned_to_ids')) {
            $query = $query->whereIn('assigned_to_id', $assigned_to_id);
        }

        if ($author_id = array_get($params, 'author_ids')) {
            $query = $query->whereIn('author_id', $author_id);
        }

        if ($priorities = array_get($params, 'priority_ids')) {
            $query->whereIn('priority_id', (array)$priorities);
        }

        $groupCount = null;
        if ($group = array_get($params, 'group')) {
            switch ($group) {
                case 'author':
                case 'assigned':
                    $query
                        ->addSelect(DB::raw('CONCAT(' . $group . '.firstname, " ", ' . $group . '.lastname) as ordering'))
                        ->references($group);
                    break;

                case 'done_ratio':
                    $query->addSelect(DB::raw('CONCAT(' . Issue::getTableName() . '.done_ratio, "%") as ordering'));
                    break;

                case 'project':
                case 'tracker':
                case 'status':
                case 'priority':
                case 'category':
                case 'version':
                    $query
                        ->addSelect($group . '.name as ordering')
                        ->references($group);
                    break;
            }

            $query->orderBy('ordering');

            // clone query withou releted columns for calculate count rows in groups
            $groupCount = (clone $query)
                ->disableRelationColumns()
                ->selectRaw('COUNT(' . Issue::getTableName() . '.id) as rows')
                ->groupBy('ordering')
                ->get(['rows', 'ordering'])
                ->pluck('rows', 'ordering');
        }

        if ($order = array_get($params, 'order', ['updated_on' => 'desc'])) {
            if (\is_string($order) && \count($split = explode(':', $order)) === 2) {
                $order = [$split[0] => $split[1]];
            }

            // todo: add check, if column available
            foreach ($order as $key => $val) {
                $query->orderBy($key, $val);
            }
        }

        $data = $query->paginate(array_get($params, 'per_page', 20));
        $data->groups = $groupCount;

        return $data;
    }

    public function one($id)
    {
        return Issue::query()
            ->where('id', $id)
            ->with([
                'attachments.author',
                'tracker',
                'assigned',
                'author',
                'project',
                'priority',
                'watchers',
                'attachments',
                'project.trackers',
                'project.members.user',
                'child',
                'journals.user',
                'journals.details',
            ])
            ->first();
    }

    public function create(array $data)
    {
        /** @var Issue $issue */
        $issue = Issue::make(array_only(
            $data,
            [
                'author_id',
                'tracker_id',
                'project_id',
                'subject',
                'description',
                'due_date',
                'category_id',
                'status_id',
                'assigned_to_id',
                'priority_id',
                'start_date',
                'done_ratio',
                'estimated_hours',
                'parent_id',
                'is_private'
            ]
        ));

        if ($issue->save()) {
            $issue->watchers()->sync(array_get($data, 'watchers'));

            if ($attachmentsIds = array_get($data, 'new_attachments')) {
                $attachments = Attachment::query()
                    ->whereIn('id', $attachmentsIds)
                    ->get();
                $issue->attachments()->saveMany($attachments->getDictionary());
            }

            return $issue;
        }

        return false;
    }

    public function update($id, array $data)
    {
        // todo: change to call "$this->one()" method
        /** @var Issue $issue */
        if ($issue = Issue::query()->where(['id' => $id])->first()) {
            $issue->fill(array_only(
                $data,
                [
                    'tracker_id',
                    'project_id',
                    'subject',
                    'description',
                    'due_date',
                    'category_id',
                    'status_id',
                    'assigned_to_id',
                    'priority_id',
                    'start_date',
                    'done_ratio',
                    'estimated_hours',
                    'parent_id',
                    'is_private'
                ]
            ));
            $journalDetails = [];

            // get changed attributes
            foreach ($issue->getDirty() as $key => $value) {
                $journalDetails[] = [
                    'property' => 'attr',
                    'prop_key' => $key,
                    'old_value' => $issue->getOriginal($key),
                    'value' => $value,
                ];
            }

            // save watchers
            $issue->watchers()->sync(array_get($data, 'watchers'));

            // save attachments
            // todo: check author is the same who create issue.
            if ($attachmentsIds = array_get($data, 'new_attachments')) {
                $attachments = Attachment::query()->whereIn('id', $attachmentsIds)->get();
                $issue->attachments()->saveMany($attachments->getDictionary());
            }


            if ($issue->update()) {
                // save journal if notes exists or fileds change
                $notes = array_get($data, 'notes');

                if ($journalDetails || $notes) {
                    /** @var Journal $journal */
                    $journal = $issue->journals()->make([
                        'notes' => $notes,
                        'private_notes' => array_get($data, 'private_notes', 0),
                        'user_id' => array_get($data, 'user_id')
                    ]);

                    if ($journal->save()) {
                        $journal->details()->createMany($journalDetails);
                    }
                }

                return $issue;
            }
        }

        return false;
    }

    public function delete($id)
    {
        if ($issue = Issue::query()->where(['id' => $id])->first()) {
            $issue->watchers()->detach();

            /** @var Journal $journal */
            foreach ($issue->journals as $journal) {
                $journal->details()->delete();
                try {
                    $journal->delete();
                } catch (\Exception $e) {
                    // todo: process error on delete journal row
                }
            }

            // todo: fix parent id on releted and child issues
            // todo: remove attachments
            // todo: remove time_entries

            try {
                $issue->delete();
            } catch (\Exception $e) {
                return false;
            }

            return true;
        }

        return false;
    }

    public function watch($id, $userId)
    {
        if ($issue = Issue::query()->where(['id' => $id])->first()) {
            $issue->watchers()->attach($userId);
            return true;
        }

        return false;
    }

    public function unwatch($id, $userId)
    {
        if ($issue = Issue::query()->where(['id' => $id])->first()) {
            $issue->watchers()->detach($userId);
            return true;
        }

        return false;
    }

    public function statuses()
    {
        return IssueStatus::query()->get();
    }

    public function categories($projectId, array $with = [])
    {
        return IssueCategory::query()
            ->with($with)
            ->where(['project_id' => $projectId])
            ->get();
    }


    public function category($id, array $with = [])
    {
        return IssueCategory::query()
            ->where('id', $id)
            ->with($with)
            ->first();
    }

    public function createCategory(array $data)
    {
        $category = IssueCategory::make(array_only($data, ['name', 'assigned_to_id', 'project_id']));

        if ($category->save()) {
            return $category;
        }

        return false;
    }

    /**
     * Edit IssueCategory
     *
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateCategory($id, array $data)
    {
        if (($category = $this->category($id)) && $category->update(array_only($data, ['name', 'assigned_to_id']))) {
            return $category;
        }

        return false;
    }

    public function deleteCategory($id)
    {
        if ($category = $this->category($id)) {
            $category->issues()->update(['category_id' => null]);
            $category->delete();

            return true;
        }

        return false;
    }

}