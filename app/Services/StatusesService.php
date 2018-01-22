<?php

namespace App\Services;

use App\Models\IssueStatus;


class StatusesService
{

    public function all()
    {
        return IssueStatus::all();
    }

	public function getList()
	{
		return IssueStatus::all();
	}

}
