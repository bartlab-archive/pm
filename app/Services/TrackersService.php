<?php

namespace App\Services;

use App\Models\Tracker;


class TrackersService
{

    public function all()
    {
        return Tracker::all();
    }

}