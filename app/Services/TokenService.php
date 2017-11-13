<?php

namespace App\Services;


use App\Models\Token;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class TokenService
{
    public function one(User $user, string $action): Token
    {
        return $user->tokens()
                ->where('action', $action)
                ->first() ?? $this->create($user, $action);
    }

    public function create(User $user, string $action, string $value = null): Token
    {
        return $user->tokens()
            ->create([
                'action' => $action,
                'value' => $value ?? sha1(str_random(33))
            ]);
    }

    public function all(User $user): Collection
    {
        return $user->tokens;
    }

    public function destroy(User $user, string $action): bool
    {
        return $user->tokens()
            ->where('action', $action)
            ->delete();
    }

    public function getApiKey($user)
    {
        $user_api_key = Token::apiKey($user);

        if (is_null($user_api_key)) {
            $user_api_key = Token::createApiKey($user);
        }

        return $user_api_key;
    }

    public function resetApiKey($user)
    {
        $user_api_key = Token::apiKey($user);

        if (is_null($user_api_key)) {
            $user_api_key = Token::createApiKey($user);
        } else {
            $user_api_key->value = sha1(str_random(33));
            $user_api_key->save();
        }

        return $user_api_key;
    }

    public function resetAtomKey($user)
    {
        $user_atom_key = Token::atomKey($user);

        if (is_null($user_atom_key)) {
            $user_atom_key = Token::createAtomKey($user);
        } else {
            $user_atom_key->value = sha1(str_random(33));
            $user_atom_key->save();
        }

        return $user_atom_key;
    }
}