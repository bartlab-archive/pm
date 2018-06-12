<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Arr;

class SettingsService
{
    protected $list;

    public function __construct()
    {
        $this->load();
    }

    public function load()
    {
        if (!$this->list) {
            $this->list = Setting::query()->pluck('value', 'name');
        }

        return $this->list;
    }

    public function get($name, $default = null)
    {
        return Arr::get($this->list, $name, $default);
    }

    public function one($name)
    {
        return Setting::query()->where(['name' => $name])->first() ?? Setting::make();
    }
}