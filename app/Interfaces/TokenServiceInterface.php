<?php

namespace App\Interfaces;


use App\Models\Token;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface TokenServiceInterface
{
    public function firstOrCreate(User $user, string $action, string $value): Token;

    public function one(User $user, string $action, string $value): Token;

    public function create(User $user, string $action, string $value): Token;

    public function all(User $user): Collection;
}