<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChagePasswordRequest;
use App\Http\Requests\UpdateRequest;
use App\Interfaces\AccountServiceInterface;

/**
 * Class AccountController
 */
class AccountController extends Controller
{

    /**
     * @var AccountServiceInterface
     */
    protected $accountService;

    public function __construct(AccountServiceInterface $accountService)
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

    public function changePassword(ChagePasswordRequest $request)
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