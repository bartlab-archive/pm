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

        // filter by status ids
        if ($status = array_get($params, 'status_ids')) {
            $query->whereIn('status', $status);
        }

        // get only pablic and my project
        if ($userIds = array_get($params, 'user_ids')) {
            $query->where(function ($query) use ($userIds) {
                $query->where(['is_public' => Project::IS_PUBLIC])->orWhereHas('members', function ($query) use ($userIds) {
                    $query->whereIn('user_id', $userIds);
                });
            });
        }

        if ($public = array_get($params, 'public')) {
            $query->whereIn('is_public', $public);
        }

        if ($order = array_get($params, 'order', ['name' => 'asc'])) {
            if (\is_string($order) && \count($split = \explode(':', $order)) === 2) {
                $order = [$split[0] => $split[1]];
            }

            $columns = \Schema::getColumnListing(Project::getTableName());

            foreach ($order as $key => $val) {
                // check, if column available
                if (\in_array($key, $columns, true)) {
                    $query->orderBy($key, $val);
                }
            }
        }

        if ($perPage = array_get($params, 'per_page')) {
            return $query->paginate($perPage);
        }

        return $query->get();
    }

    public function allByUserId(array $userIds, array $with = [])
    {
        return Project::query()
            ->with($with)
            ->where(['status' => Project::STATUS_ACTIVE])
            ->whereHas('members', function ($query) use ($userIds) {
                $query->whereIn('user_id', $userIds);
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
            ->where(['identifier' => $identifier])
            ->with($with)
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

    public function isMember($id, array $userIds)
    {
        if ($project = $this->oneById($id)) {
            return $project->members()->whereIn('user_id', $userIds)->exists();
        }

        return false;
    }

//    public function members(int $projectId, array $with = [])
//    {
//        return Member::with($with)
//            ->where(['project_id' => $projectId])
//            ->get();
//    }

    public function member($id)
    {
        return Member::query()
            ->where(['id' => $id])
            ->first();
    }

    public function createMember($projectId, $userId, array $roleIds)
    {
        $member = Member::make([
            'project_id' => $projectId,
            'user_id' => $userId,
        ]);

        if ($member->save()) {
            $member->roles()->attach($roleIds);

            return $member;
        }

        return false;
    }

    public function updateMember($memberId, array $roleIds)
    {
        /** @var Member $member */
        if ($member = $this->member($memberId)) {
            $member->roles()->sync($roleIds);

            return true;
        }

        return false;
    }

    public function removeMember($memberId)
    {
        /** @var Member $member */
        if ($member = $this->member($memberId)) {
            try {
                return $member->roles()->detach() && $member->delete();
            } catch (\Exception $e) {
                return false;
            }
        }

        return false;
    }
}