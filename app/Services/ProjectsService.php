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

        if ($status = array_get($params, 'status')) {
            $query->where('status', $status);
        }

//        if ($closed = array_get($params, 'closed')) {
//            $query->orWhere('status', Project::CLOSED_STATUS);
//        }

        if ($order = array_get($params, 'order', ['name' => 'asc'])) {
            if (is_string($order) && count($split = explode(':', $order)) == 2) {
                $order = [$split[0] => $split[1]];
            }

            // todo: add check, if column available
            foreach ($order as $key => $val) {
                $query->orderBy($key, $val);
            }
        }

//        $total = $query->count();
//        $limit = array_get($params, 'limit', 20);
//        $offset = array_get($params, 'offset', 0);

//        if ($offset > 0 && $offset >= $total) {
//            $offset = $offset - $limit;
//        }

//        $query->setPerPage($limit);
//        $query->paginate(1);

        return $query
//            ->setPerPage(array_get($params, 'per_page', 20))
            ->paginate(array_get($params, 'per_page', 20));
//        return [
//            'total' => $total,
//            'limit' => $limit,
//            'offset' => $offset,
//            'list' => $query
//                ->offset($offset)
//                ->limit($limit)
//                ->get()
//                ->paginate(100)
        // public function paginate($perPage = null, $columns = ['*'], $pageName = 'page', $page = null)
//        ];
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