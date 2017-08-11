<?php

namespace App\Services;

use App\Models\Tracker;



class TrackersService
{

    public function all()
    {
        return Tracker::all();
    }

    public function list() {
        return Tracker::select('id', 'name')->get();
    }

}