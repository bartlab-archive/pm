<?php

namespace App\Http\Controllers;


use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UpdateRequest;
use App\Services\AccountService;
use Illuminate\Routing\Controller as BaseController;

/**
 * Class AccountController
 */
class AccountController extends BaseController
{

    /**
     * @var AccountService
     */
    protected $accountService;

    public function __construct(AccountService $accountService)
    {
        $this->accountService = $accountService;
    }

    public function show()
    {
        return $this->accountService->get();
    }

    public function update(UpdateRequest $request)
    {
        $this->accountService->update($request->all());
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