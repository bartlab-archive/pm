<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\User\IndexUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
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

    public function index(IndexUserRequest $request)
    {
        return UserResource::collection(
            $this->usersService->all(array_merge(
                $request->validated(),
                [
                    \Auth::admin() ? [] : ['status' => [User::STATUS_ACTIVE]]
                ]
            ))
//            $this->usersService->all(['type' => 'all'])
        );
    }

    public function show($id)
    {
//        if ($user = $this->usersService->getById($id)) {
//            $user['avatar_img'] = "//www.gravatar.com/avatar/" . $user->avatar_hash;
//            return $user;
//        }
//        abort(404);
        if (!$user = $this->usersService->one($id, ['emails', 'preference'])) {
            abort(404);
        }

        return UserResource::make($user);
    }

//    public function updateUserStatus($id, Request $request)
//    {
//        $this->usersService->update($id, $request->all());
//        return response()->json(true, 200);
//    }

    public function store(StoreUserRequest $request)
    {
        if (!$user = $this->usersService->create(array_merge($request->validated(), ['status' => User::STATUS_ACTIVE]))) {
            abort(422);
        }

        return UserResource::make($user);
    }

    public function destroy($id)
    {
        $this->usersService->delete($id);
        return response(null, 204);
    }

    public function update($id, UpdateUserRequest $request)
    {
        if (!$user = $this->usersService->one($id)) {
            abort(404);
        }

        if (!$user = $this->usersService->update($id, $request->validated())) {
            abort(422);
        }

        return UserResource::make($user);
//        $result = $this->usersService->update($id, $request->except('tokens', 'avatar_hash', 'members', 'issues', 'projects', 'avatar_img'));
//        return response((string)$result, 200);
    }
}