<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use App\Models\Node;

class BaumServiceProvider extends ServiceProvider
{

	public  function boot() {
		parent::boot();
	}

	public function register()
	{
		$this->app->bind('App\Models\Node', function () {
			return new Node();
		});
	}

}
