<?php

namespace App\Services;


use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AccountService
{


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