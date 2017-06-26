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
}