<?php

namespace App\Http\Controllers;


use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
use App\Services\UsersService;
use Illuminate\Routing\Controller as BaseController;


/**
 * Class AccountController
 *
 * @property UsersService $usersService
 *
 */
class AccountController extends BaseController
{

    protected $usersService;

    public function __construct(
        UsersService $usersService
    )
    {
        $this->usersService = $usersService;
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

//    public function changePassword(ChangePasswordRequest $request)
//    {
//        $result = $this->usersService->changePassword($request->all());
//        return response((string)$result, 200);
//    }

//    public function showApiKey()
//    {
//        return response([
//            'token' => $this->tokenService->getApiKey(Auth::user())
//        ], 200);
//    }

//    public function resetApiKey()
//    {
//        $token = $this->tokenService->resetApiKey(Auth::user())->toArray();
//
//        return response([
//            'updated_on' => $token['updated_on'],
//            'value' => $token['value']
//        ], 200);
//    }

//    public function resetAtomKey()
//    {
//        return response([
//            'updated_on' => $this->tokenService->resetAtomKey(Auth::user())->toArray()['updated_on']
//        ], 200);
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