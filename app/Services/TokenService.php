<?php

namespace App\Services;


use App\Models\Token;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class TokenService
{

    public function oneByValue($value, $action, array $with = [])
    {
        return Token::query()
            ->with($with)
            ->where(['value' => $value, 'action' => $action])
            ->first();
    }

    public function oneByUserId($userId, $action, array $with = [], $orNew = false)
    {
        $token = Token::query()
            ->where(['user_id' => $userId, 'action' => $action])
            ->first();

        if (!$token && $orNew) {
            $token = $this->create($userId, $action);
        }

        return $token ? $token->load($with) : null;
    }

    public function create($userId, string $action, string $value = null)
    {
        $token = Token::make([
            'user_id' => $userId,
            'action' => $action,
            'value' => $value ?? sha1(str_random(33))
        ]);

        return $token->save() ? $token : null;
    }

//    public function all(User $user): Collection
//    {
//        return $user->tokens;
//    }

//    public function destroy(User $user, string $action): bool
//    {
//        return $user->tokens()
//            ->where('action', $action)
//            ->delete();
//    }
//
//    public function getApiKey($user)
//    {
//        $user_api_key = Token::apiKey($user);
//
//        if ($user_api_key === null) {
//            $user_api_key = Token::createApiKey($user);
//        }
//
//        return $user_api_key;
//    }
//
//    public function resetApiKey($user)
//    {
//        $user_api_key = Token::apiKey($user);
//
//        if ($user_api_key === null) {
//            $user_api_key = Token::createApiKey($user);
//        } else {
//            $user_api_key->value = sha1(str_random(33));
//            $user_api_key->save();
//        }
//
//        return $user_api_key;
//    }
//
//    public function resetAtomKey($user)
//    {
//        $user_atom_key = Token::atomKey($user);
//
//        if ($user_atom_key === null) {
//            $user_atom_key = Token::createAtomKey($user);
//        } else {
//            $user_atom_key->value = sha1(str_random(33));
//            $user_atom_key->save();
//        }
//
//        return $user_atom_key;
//    }
}