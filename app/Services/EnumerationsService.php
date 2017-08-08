<?php

namespace App\Services;

use App\Models\Enumeration;


class EnumerationsService
{

    public function getPrioritiesList() {
        return Enumeration::where('type', 'IssuePriority')->select('id', 'name')->get();
    }

}