<?php

namespace App\Services;

use App\Models\Enumeration;


class EnumerationsService
{

    public function list() {
        return Enumeration::where('type', 'IssuePriority')->select('id', 'name')->get();
    }

}