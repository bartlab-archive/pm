<?php

namespace App\Services;


use App\Interfaces\TokenServiceInterface;
use App\Models\Token;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class TokenService implements TokenServiceInterface
{
    public function firstOrCreate(User $user, string $action, string $value): Token
    {
        return $user->tokens()
            ->firstOrCreate([
                'action' => $action,
                'value' => $value
            ]);
    }

    public function one(User $user, string $action, string $value): Token
    {
        return $user->tokens()
            ->where('action', $action)
            ->where('value', $value)
            ->first();
    }

    public function create(User $user, string $action, string $value): Token
    {
        return $user->tokens()
            ->create([
                'action' => $action,
                'value' => $value
            ]);
    }

    public function all(User $user): Collection
    {
        return $user->tokens;
    }
}