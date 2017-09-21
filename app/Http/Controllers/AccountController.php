<?php

namespace App\Http\Controllers;


use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UpdateRequest;
use App\Services\AccountService;
use App\Services\UsersService;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;


/**
 * Class AccountController
 *
 * @property AccountService $accountService
 * @property UsersService $usersService
 *
 */
class AccountController extends BaseController
{

    /**
     * @var AccountService
     */
    protected $accountService;
    protected $usersService;

    public function __construct(AccountService $accountService, UsersService $usersService)
    {
        $this->accountService = $accountService;
        $this->usersService = $usersService;
    }

    public function show()
    {
        return $this->usersService->getById(Auth::user()->id, ['email', 'preference']);
    }

    public function update($id, UpdateRequest $request)
    {
        $this->usersService->update($id, $request->all());
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $this->accountService->changePassword($request->all());

        return response(null, 204);
    }

    public function showApiKey()
    {
        return response($this->accountService->getApiKey());
    }

    public function resetApiKey()
    {
        return response($this->accountService->resetApiKey());
    }

    public function resetAtomKey()
    {
        return response($this->accountService->resetAtomKey());
    }
}