<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// todo: check how it works in redmine, there no table `groups`
class Group extends Model
{
	public $timestamps = false;

	protected $guarded = ['id'];
}
