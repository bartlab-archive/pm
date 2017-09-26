<?php

namespace App\Services;

use App\Models\JournalDetail;

class JournalDetailsService
{
    public function create(array $data)
    {
        $journalDetail = new JournalDetail($data);
        return $journalDetail->save();
    }
}