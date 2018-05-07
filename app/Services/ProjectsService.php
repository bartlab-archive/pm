<?php

namespace App\Services;

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
        return Project::create($data);
    }
}