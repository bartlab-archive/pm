<?php

namespace App\Services;

use App\Models\Journal;

class JournalsService
{
    public function getList($params = [], $with = [])
    {
        return Journal::where($params)->with($with)->get();
    }

    public function create(array $data)
    {
        $journal = new Journal($data);
        $journal->save();
        return $journal;
    }
}