<?php

namespace App\Services;

use App\Interfaces\AccountServiceInterface;
use Illuminate\Support\Facades\Auth;

class AccountService implements AccountServiceInterface
{

    public function get()
    {
        return Auth::user();
    }

    public function changePassword(array $data)
    {
//        $this->validate($request, $this->rules(), $this->messages());

//        $user = User::userByHeaderAuthToken($request);
//        $pass = $this->preparePassword($user, $request->input('password'));
//
//        if ($pass !== $user->hashed_password) {
//            return response()->json(['password' => 'Invalid credentials.'], 422);
//        }
//
//        $this->resetPassword($user, $request->input('new_password'));
//
//        $user->update(['passwd_changed_on' => date('Y-m-d H:i:s')]);
//
//        return response(null, 204);
    }

    public function getApiKey()
    {
//        $user = User::userByHeaderAuthToken($request);
//        $user_api_key = Token::apiKey($user);
//
//        if (is_null($user_api_key)) {
//            $user_api_key = Token::createApiKey($user);
//        }
//
//        return response($this->buildResponse($user, $user_api_key));
    }

    public function resetApiKey()
    {
//        $user = User::userByHeaderAuthToken($request);
//        $user_api_key = Token::apiKey($user);
//
//        if (is_null($user_api_key)) {
//            $user_api_key = Token::createApiKey($user);
//        } else {
//            $user_api_key->value = sha1(str_random(33));
//            $user_api_key->save();
//        }
//
//        return response($this->buildResponse($user, $user_api_key)['updated_on']);
    }

    public function resetAtomKey()
    {
//        $user = User::userByHeaderAuthToken($request);
//        $user_atom_key = Token::atomKey($user);
//
//        if (is_null($user_atom_key)) {
//            $user_atom_key = Token::createAtomKey($user);
//        } else {
//            $user_atom_key->value = sha1(str_random(33));
//            $user_atom_key->save();
//        }
//
//        return response($this->buildResponse($user, $user_atom_key)['updated_on']);
    }

}