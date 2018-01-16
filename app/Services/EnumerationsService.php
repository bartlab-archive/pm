<?php

namespace App\Services;

use App\Models\Enumeration;

/**
 * Class EnumerationsService
 *
 * @property ProjectsService $projectsService
 *
 * @package App\Services
 */
class EnumerationsService
{
    protected $projectsService;

    /**
     * EnumerationsService constructor.
     * @param ProjectsService $projectsService
     */
    public function __construct(ProjectsService $projectsService)
    {
        $this->projectsService = $projectsService;
    }

    /**
     * Get Enumeration list
     *
     * @param array $params
     * @param bool $projectIdIsNull
     * @return mixed
     */
//    public function getList($params = [], $projectIdIsNull = true)
//    {
//        $enumerations = Enumeration::orderBy('position');
//        $projectIdIsNull ? $enumerations->whereNull('project_id') : null;
//        !empty($params) ? $enumerations->where($params) : null;
//
//        return $enumerations->get();
//    }

    public function all(array $params = [])
    {
        $query = Enumeration::with(['project'])
            ->where('active', Enumeration::ACTIVE_ON)
			//->where('type6', '3')
            ->orderBy('position');

        if ($type = array_get($params, 'type')) {
            $query->where('type', $type);
        }

        if ($project = array_get($params, 'project_identifier')) {
            $query->whereNull('project_id')->orWhereHas('project', function ($query) use ($project) {
                $query->where('identifier', $project);
            });
        }

        return $query->get();
    }

    /**
     * Create Enumeration
     *
     * @param $identifier
     * @param $data
     * @return bool
     */
    public function create($identifier, $data)
    {
        $project = $this->projectsService->one($identifier);
        $data['project_id'] = $project->id;

        $enumeration = new Enumeration($data);
        return $enumeration->save();
    }

    /**
     * Delete Enumeration by id
     *
     * @param int $enumerationId
     * @return bool
     */
    public function deleteById($enumerationId)
    {
        return Enumeration::where(['id' => $enumerationId])->whereNotNull('project_id')->delete();
    }

    /**
     * Edit Enumeration
     *
     * @param $enumerationId
     * @param $data
     * @return mixed
     */
    public function update($enumerationId, $data)
    {
        return Enumeration::where(['id' => $enumerationId])->whereNotNull('project_id')->update($data);
    }
}