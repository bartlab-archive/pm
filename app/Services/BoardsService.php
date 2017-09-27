<?php

namespace App\Services;

use App\Models\Board;

/**
 * Class BoardsService
 *
 * @property ProjectsService $projectsService
 *
 * @package App\Services
 */
class BoardsService
{
    protected $projectsService;

    public function __construct(ProjectsService $projectsService)
    {
        $this->projectsService = $projectsService;
    }

    /**
     * Create Board
     *
     * @param $identifier
     * @param $data
     * @return bool
     */
    public function create($identifier, $data)
    {
        $project = $this->projectsService->one($identifier);
        $data['project_id'] = $project->id;

        $board = new Board($data);
        return $board->save();
    }

    /**
     * Delete Board by id
     *
     * @param int $boardId
     * @return bool
     */
    public function deleteById($boardId)
    {
        return Board::find($boardId)->delete();
    }

    /**
     * Edit Board
     *
     * @param $boardId
     * @param $data
     * @return mixed
     */
    public function update($boardId, $data)
    {
        return Board::where(['id' => $boardId])->update($data);
    }
}