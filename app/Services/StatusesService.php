<?php

namespace App\Services;

use App\Models\IssueStatuse;


class StatusesService
{

    public function all()
    {
        return IssueStatuse::all();
    }

	public function getList()
	{
		return IssueStatuse::all();
	}

}
