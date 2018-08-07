<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class TrackerStateResource extends Resource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'tracker' => TrackerResource::make($this->tracker),
//            'name' => $this->name,
            'enable' => $this->enable
        ];
    }
}
