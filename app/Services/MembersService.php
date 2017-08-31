<?php

namespace App\Services;

use App\Models\Member;


/**
 * Class MembersService
 *
 * @property ProjectsService $projectsService
 *
 * @package App\Services
 */
class MembersService
{
    /**
     * @var ProjectsService $projectsService
     */
    protected $projectsService;

    public function __construct(ProjectsService $projectsService)
    {
        $this->projectsService = $projectsService;
    }

    /**
     * Delete members by id
     *
     * @param int $memberId
     * @return bool
     */
    public function deleteById($memberId)
    {
        Member::find($memberId)->delete();

        return true;
    }

    /**
     * Edit member
     *
     * @param $memberId
     * @param $data
     * @return mixed
     */
    public function editMember($memberId, $data)
    {
        $member = Member::where(['id' => $memberId])->firstOrFail();
        $member->fill($data);
        return $member->save();
    }

    /**
     * Create member
     *
     * @param $identifier
     * @param $data
     * @return bool|mixed
     */
    public function createMember($identifier, $data)
    {
        $project = $this->projectsService->one($identifier);

        $member = new Member($data);
        $member->project_id = $project->id;

        if ($member->save()) {
            return $member->id;
        }

        return false;
    }
}