<?php

namespace App\Services;

use App\Models\Tracker;



class TrackersService
{

    public function getTrackers()
    {
        return Tracker::all();
    }

    public function getTrackersList() {
        return Tracker::select('id', 'name')->get();
    }

}