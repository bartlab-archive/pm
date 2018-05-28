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

        // todo: make status active and closed
        if ($status = array_get($params, 'status', Project::STATUS_ACTIVE)) {
            $query->where('status', $status);
        }

        // todo: get only pablic and my project

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

        if ($perPage = array_get($params, 'per_page')){
            return $query
                ->paginate($perPage);
        }

        return $query->get();
    }

    public function one($identifier, $with = [])
    {
        return Project::query()
            ->where('identifier', $identifier)
            ->with($with)
//            ->with([
//                'enabledModules',
//                'users'
//            ])
            ->first();
    }


    public function create($data){

        $parent = $this->one($data['parent_identifier']);
        $data['parent_id'] = $parent->id;

        $model = Project::create($data);

        if($model->inherit_members) {

            $parent_members = $model->parent->members;

            foreach($parent_members as $member) {
                // todo: what about intersect of members between original and parent ?
                $member->replicate()->fill(['project_id' => $model->id])->push();
            }
        }

        return $model;
    }

    public function update($identifier, $data) {

        if(isset($data['parent_identifier'])) {
            $parent = $this->one($data['parent_identifier'], ['parent']);
            $data['parent_id'] = $parent->id;
        }

        $model = $this->one($identifier);
        $prev_parent_id = $model->parent_id;

        if($model && $model->update($data)) {

                if(! $model->inherit_members) {
                    // todo: delete previously inherited members based on members_roles inherited_from column
                }

                // do not copy members if update request doesn't change parent project
                if($prev_parent_id !== $model->parent_id && $model->inherit_members) {

                    $parent_members = $model->parent->members;

                    foreach($parent_members as $member) {
                        $member->replicate()->fill(['project_id' => $model->id])->push();
                    }
                }
        }

        return $model;
    }
}