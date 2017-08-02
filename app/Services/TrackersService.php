<?php

namespace App\Services;

use App\Models\Tracker;



class TrackersService
{

    public function getTrackers()
    {
        return Tracker::all();
    }

}