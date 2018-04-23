<?php

namespace App\Http\Controllers;

use App\Http\Requests\Projects\ProjectExistsRequest;
use App\Http\Resources\UserResource;
use App\Services\UsersService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class UsersController
 *
 * @property UsersService $usersService
 *
 * @package App\Http\Controllers\Projects
 */
class UsersController extends BaseController
{

    /**
     * @var UsersService
     */
    protected $usersService;

    /**
     * RolesController constructor.
     * @param UsersService $usersService
     * @internal param RolesService $rolesService
     */
    public function __construct(UsersService $usersService)
    {
        $this->usersService = $usersService;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function index()
    {
        return UserResource::collection(
            $this->usersService->all()
        );
    }

    public function getUser($id)
    {
        if ($user = $this->usersService->getById($id)) {
            $user['avatar_img'] = "//www.gravatar.com/avatar/" . $user->avatar_hash;
            return $user;
        }
        abort(404);
    }

    public function updateUserStatus($id, Request $request)
    {
        $this->usersService->update($id, $request->all());
        return response()->json(true, 200);
    }

    public function destroy($id)
    {
        $this->usersService->delete($id);
        return response(null, 204);
    }

    public function update($id, Request $request)
    {
        $result = $this->usersService->update($id, $request->except('tokens', 'avatar_hash', 'members', 'issues', 'projects', 'avatar_img'));
        return response((string)$result, 200);
    }
}