<?php

namespace App\Services;

use App\Models\Member;
use App\Models\Project;

/**
 * Class ProjectsService
 *
 * @package App\Services
 */
class ProjectsService
{
    public function all(array $params = [])
    {
        $query = Project::with(array_get($params, 'with', []));
//        $query = Project::with([
//            'users',
//            'versions',
//            'enabledModules'
//        ]);

        // filter by status ids
        if ($status = array_get($params, 'status_ids')) {
            $query->whereIn('status', $status);
        }

//        if ($my = array_get($params, 'my', false)) {
//            $query->whereHas('members', function ($query) use ($userId) {
//                $query->where(['user_id' => $userId]);
//            });
//        }

        // todo: get only pablic and my project
//        if ($userId = array_get($params, 'userId')) {
//            $query->whereHas('members', function ($query) use ($userId) {
//                $query->where(['user_id' => $userId]);
//            });
//        }

        // get only pablic and my project
        if ($userId = array_get($params, 'user_id')) {
            $query->where(function ($query) use ($userId) {
                $query->where(['is_public' => Project::IS_PUBLIC])->orWhereHas('members', function ($query) use ($userId) {
                    $query->where(['user_id' => $userId]);
                });
            });
        }

        if ($public = array_get($params, 'public')) {
            $query->whereIn('is_public', $public);
        }

//        if ($closed = array_get($params, 'closed')) {
//            $query->orWhere('status', Project::STATUS_ACTIVE);
//        }

        if ($order = array_get($params, 'order', ['name' => 'asc'])) {
            if (\is_string($order) && \count($split = \explode(':', $order)) === 2) {
                $order = [$split[0] => $split[1]];
            }

            // todo: add check, if column available
            foreach ($order as $key => $val) {
                $query->orderBy($key, $val);
            }
        }

        if ($perPage = array_get($params, 'per_page')) {
            return $query->paginate($perPage);
        }

        return $query->get();
    }

    public function allByUserId($userId, array $with = [])
    {
        return Project::query()
            ->with($with)
            ->where(['status' => Project::STATUS_ACTIVE])
            ->whereHas('members', function ($query) use ($userId) {
                $query->where(['user_id' => $userId]);
            })
            ->orderBy('name')
            ->get();
    }

    public function oneByIdentifier($identifier, array $with = [])
    {
        if (!$identifier) {
            return false;
        }

        return Project::query()
            ->where('identifier', $identifier)
            ->with($with)
//            ->with([
//                'enabledModules',
//                'users'
//            ])
            ->first();
    }

    public function oneById($id, array $with = [])
    {
        if (!$id) {
            return false;
        }

        return Project::query()
            ->where(['id' => $id])
            ->with($with)
//            ->with([
//                'enabledModules',
//                'users'
//            ])
            ->first();
    }


    public function create(array $data)
    {
        if ($project = Project::create($data)) {
            if ($project->inherit_members) {
                // todo: check parent and parent members for null
                foreach ($project->parent->members as $member) {
                    // todo: what about intersect of members between original and parent ?
                    $member->replicate()->fill(['project_id' => $project->id])->push();
                }
            }

            return $project;
        }

        return false;
    }

    public function update($id, array $data)
    {
        if ($project = $this->oneById($id)) {
            $prevParentId = $project->parent_id;

            if ($project->update($data)) {
                if (!$project->inherit_members) {
                    // todo: delete previously inherited members based on members_roles inherited_from column
                }

                // do not copy members if update request doesn't change parent project
                if ($prevParentId !== $project->parent_id && $project->inherit_members) {
                    // todo: check parent and parent members for null
                    foreach ($project->parent->members as $member) {
                        $member->replicate()->fill(['project_id' => $project->id])->push();
                    }
                }

                return $project;
            }
        }

        return false;
    }
}