<?php

namespace App\Http\Controllers;


use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UpdateRequest;
use App\Services\AccountService;
use App\Services\EmailAddressesService;
use App\Services\UsersService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;


/**
 * Class AccountController
 *
 * @property AccountService $accountService
 * @property UsersService $usersService
 * @property EmailAddressesService $emailAddressesService
 *
 */
class AccountController extends BaseController
{

    /**
     * @var AccountService
     */
    protected $accountService;
    protected $usersService;
    protected $emailAddressesService;

    public function __construct(
        AccountService $accountService,
        UsersService $usersService,
        EmailAddressesService $emailAddressesService
    )
    {
        $this->accountService = $accountService;
        $this->usersService = $usersService;
        $this->emailAddressesService = $emailAddressesService;
    }

    public function show()
    {
        return $this->usersService->getById(Auth::user()->id, ['email', 'additionalEmails', 'preference']);
    }

    public function update($id, UpdateRequest $request)
    {
        $result = $this->usersService->update($id, $request->all());
        dd($result);
        return response($result, 200);
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