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

            $members = Member::query()
                ->where('project_id', $model->parent_id)
                ->get();

            foreach($members as $member) {
                // todo: what about intersect of members between original and parent ?
                $new_member = $member->replicate();
                $new_member->project_id = $model->id;
                $new_member->push();
            }
        }

        return $model;
    }

    public function update($data) {

        $parent = $this->one($data['parent_identifier']);
        $data['parent_id'] = $parent->id;

        $model = Project::query()->where('identifier', $data['identifier'])->first();

        if($model) {

            $model->fill($data);

            if($model->save()) {

                if(! $model->inherit_members) {
                    // todo: delete previously inherited members based on members_roles inherited_from column
                }

                if($model->inherit_members) {

                    $members = Member::query()
                        ->where('project_id', $model->parent_id)
                        ->get();

                    foreach($members as $member) {
                        $new_member = $member->replicate();
                        $new_member->project_id = $model->id;
                        $new_member->push();
                    }
                }

            }
        }

        return $model;
    }
}