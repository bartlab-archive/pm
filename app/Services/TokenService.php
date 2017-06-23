<?php

namespace App\Services;


use App\Interfaces\TokenServiceInterface;
use App\Models\Token;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class TokenService implements TokenServiceInterface
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
                'value' => $value ?? str_random(33)
            ]);
    }

    public function all(User $user): Collection
    {
        return $user->tokens;
    }
}