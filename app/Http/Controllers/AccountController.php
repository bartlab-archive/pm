<?php

namespace App\Http\Controllers;


use App\Http\Requests\Account\TokenAccountRequest;
use App\Http\Requests\Account\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
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

//    public function changePassword(ChangePasswordRequest $request)
//    {
//        $result = $this->usersService->changePassword($request->all());
//        return response((string)$result, 200);
//    }
//
//    public function updateAdditionalEmail($id, Request $request)
//    {
//        $result = $this->emailAddressesService->updateById($id, $request->all());
//        return response()->json($result, 200);
//    }

//    public function deleteAdditionalEmail($id)
//    {
//        $result = $this->emailAddressesService->deleteById($id);
//        return response()->json($result, 200);
//    }
//
//    public function getAdditionalEmails()
//    {
//        $result = $this->emailAddressesService->getList([
//            'user_id' => Auth::user()->id,
//            'is_default' => false
//        ]);
//        return response()->json($result, 200);
//    }
//
//    public function addAdditionalEmails(Request $request)
//    {
//        $result = $this->emailAddressesService->create(Auth::user(), $request->all());
//        return response()->json($result, 200);
//    }
}