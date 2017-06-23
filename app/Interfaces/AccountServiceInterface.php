<?php

namespace App\Interfaces;

interface AccountServiceInterface
{
    public function get();

    public function changePassword(array $data);

    public function getApiKey();

    public function resetApiKey();

    public function resetAtomKey();
}