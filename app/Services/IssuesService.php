<?php

namespace App\Services;

use App\Models\Issue;
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

    public function one($id)
    {
        return Issue::query()
            ->where('id', $id)
            ->with(['tracker', 'assigned', 'author', 'project', 'child'])
            ->first();

//        return $issue;
    }

//    public function update($id, array $data)
//    {
//        if ($issue = Issue::query()->where('id', $id)->firstOrFail()) {
//            /**
//             * @var Journal $journal
//             */
//            $journal = $this->journalsService->create([
//                'notes' => isset($data['notes']) ? $data['notes'] : null,
//                'journalized_type' => 'Issue',
//                'journalized_id' => $issue->id,
//                'user_id' => Auth::user()->id,
//                'created_on' => date('Y-m-d H:i:s')
//            ]);
//            unset($data['notes']);
//
//            $fields = [
//                'tracker_id',
//                'project_id',
//                'status_id',
//                'assigned_to_id',
//                'done_ratio',
//                'project_id',
//                'priority_id',
//                'priority_id',
//                'subject',
//                'estimated_hours',
//                'description',
//                'due_date',
//                'is_private',
//                'parent_id',
//                'start_date'
//            ];
//
//            foreach ($fields as $field) {
//                if (isset($data[$field]) && $issue[$field] != $data[$field]) {
//                    $this->journalDetailsService->create([
//                        'journal_id' => $journal->id,
//                        'property' => 'attr',
//                        'prop_key' => $field,
//                        'old_value' => $issue[$field],
//                        'value' => $data[$field]
//                    ]);
//                }
//            }
//
//            $issue->update($data);
//            return $issue;
//        }
//
//        return false;
//    }

    /**
     * @param array $data
     * @return Issue
     */
    public function create(array $data)
    {
        return Issue::create($data);
    }

    /**
     * @param array $params
     * @return array
     */
    public function all(array $params = [])
    {
        $query = Issue::with([
            'tracker',
            'project',
            'project.users',
            'project.trackers',
            'assigned',
            'author',
            'status',
            'version',
            'category',
            'priority'
        ]);

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

        if ($statuses = array_get($params, 'status_ids', [])) {
            $query->whereIn('status_id', (array)$statuses);
        }

        if ($trackers = array_get($params, 'tracker_ids', [])) {
            $query->whereIn('tracker_id', (array)$trackers);
        }

        if ($assigned_to_id = array_get($params, 'assigned_to_ids', [])) {
            $query = $query->whereIn('assigned_to_id', $assigned_to_id);
        }

        if ($author_id = array_get($params, 'author_ids', [])) {
            $query = $query->whereIn('author_id', $author_id);
        }

        if ($priorities = array_get($params, 'priority_ids', [])) {
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
            if (is_string($order) && count($split = explode(':', $order)) == 2) {
                $order = [$split[0] => $split[1]];
            }

            // todo: add check, if column available
            foreach ($order as $key => $val) {
                $query->orderBy($key, $val);
            }
        }

        $total = $query->count();
        $limit = array_get($params, 'limit', 20);
        $offset = array_get($params, 'offset', 0);

        if ($offset > 0 && $offset >= $total) {
            $offset = $offset - $limit;
        }

        return [
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'groups' => $groupCount,
            'list' => $query
                ->offset($offset)
                ->limit($limit)
                ->get()
        ];
    }

    /**
     * @param array|int $ids
     * @return int
     */
    public function delete($ids)
    {
        return Issue::destroy($ids);
    }

}