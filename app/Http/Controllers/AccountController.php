<?php

namespace App\Http\Controllers;


use App\Http\Requests\Account\ChangePasswordRequest;
use App\Http\Requests\Account\CreateEmailAccountRequest;
use App\Http\Requests\Account\TokenAccountRequest;
use App\Http\Requests\Account\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
use App\Http\Resources\EmailResource;
use App\Http\Resources\TokenResource;
use App\Services\TokenService;
use App\Services\UsersService;
use Illuminate\Routing\Controller as BaseController;


/**
 * Class AccountController
 *
 * @property UsersService $usersService
 * @property TokenService $tokenService
 *
 */
class AccountController extends BaseController
{

    protected $usersService;
    protected $tokenService;

    public function __construct(
        UsersService $usersService,
        TokenService $tokenService
    )
    {
        $this->usersService = $usersService;
        $this->tokenService = $tokenService;
    }

    public function show()
    {
        return AccountResource::make(
            $this->usersService->one(
                \Auth::id(),
                ['emails', 'preference', 'tokens']
            )
        );
    }

    public function update(UpdateAccountRequest $request)
    {
        $user = $this->usersService->update(
            \Auth::id(),
            $request->validated()
        );

        if (!$user) {
            abort(422);
        }

        return AccountResource::make($user);
    }

    public function token(TokenAccountRequest $request)
    {
        $token = $this->tokenService->refresh(
            \Auth::id(),
            $request->get('action')
        );

        if (!$token) {
            abort(422);
        }

        return TokenResource::make($token);
    }

    public function password(ChangePasswordRequest $request)
    {
        if (!$this->usersService->changePassword(\Auth::id(), $request->get('new_password'))) {
            abort(422);
        }

        return response(null, 201);
    }

    public function createEmail(CreateEmailAccountRequest $request)
    {
        if (!$this->usersService->createEmail(\Auth::id(), $request->get('email'))) {
            abort(422);
        }

        return EmailResource::collection(
            ($user = $this->usersService->one(\Auth::id(), ['emails'])) ? $user->emails : []
        );
    }

    public function updateEmail()
    {
        return response(null, 201);
    }

    public function destroyEmail()
    {
        return response(null, 201);
    }
}