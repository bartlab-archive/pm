<?php

namespace App\Services;

use App\Models\IssueStatuse;


class StatusesService
{

    public function getStatuses()
    {
        return IssueStatuse::all();
    }

}
