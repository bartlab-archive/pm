<?php

namespace App\Services;

use App\Models\Setting;

class SettingsService
{
	public function all()
	{
		return Setting::all();
	}

	public function getList()
	{
		return Setting::all();
	}
}