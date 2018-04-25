<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class StatusResource extends Resource
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
            'id' => $this->id,
            'name' => $this->name,
//            'is_closed' => $this->is_closed,
//            'position' => $this->position,
//            'default_done_ratio' => $this->default_done_ratio,
        ];
    }
}
