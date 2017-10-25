<?php

namespace App\Http\Controllers;


use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UpdateRequest;
use App\Services\AccountService;
use App\Services\EmailAddressesService;
use App\Services\TokenService;
use App\Services\UsersService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;


/**
 * Class AccountController
 *
 * @property TokenService $tokenService
 * @property UsersService $usersService
 * @property EmailAddressesService $emailAddressesService
 *
 */
class AccountController extends BaseController
{

    protected $usersService;
    protected $emailAddressesService;
    protected $tokenService;

    public function __construct(
        UsersService $usersService,
        EmailAddressesService $emailAddressesService,
        TokenService $tokenService
    )
    {
        $this->usersService = $usersService;
        $this->emailAddressesService = $emailAddressesService;
        $this->tokenService = $tokenService;
    }

    public function show()
    {
        return $this->usersService->getById(Auth::user()->id, ['email', 'additionalEmails', 'preference', 'tokens']);
    }

    public function update($id, UpdateRequest $request)
    {
        $result = $this->usersService->update($id, $request->except('tokens', 'avatar_hash'));
        return response((string)$result, 200);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $result = $this->usersService->changePassword($request->all());
        return response((string)$result, 200);
    }

    public function showApiKey()
    {
        return response($this->tokenService->getApiKey(Auth::user()), 200);
    }

    public function resetApiKey()
    {
        return response($this->tokenService->resetApiKey(Auth::user()), 200);
    }

    public function resetAtomKey()
    {
        return response($this->tokenService->resetAtomKey(Auth::user()), 200);
    }

    public function updateAdditionalEmail($id, Request $request)
    {
        $result = $this->emailAddressesService->updateById($id, $request->all());
        return response()->json($result, 200);
    }

    public function deleteAdditionalEmail($id)
    {
        $result = $this->emailAddressesService->deleteById($id);
        return response()->json($result, 200);
    }

    public function getAdditionalEmails()
    {
        $result = $this->emailAddressesService->getList([
            'user_id' => Auth::user()->id,
            'is_default' => false
        ]);
        return response()->json($result, 200);
    }

    public function addAdditionalEmails(Request $request)
    {
        $result = $this->emailAddressesService->create(Auth::user(), $request->all());
        return response()->json($result, 200);
    }
}