<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class IssuesStatuseResource extends Resource
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
//            'default_done_ratio' => $this->default_done_ratio,
            'id' => $this->id,
            'is_closed' => $this->is_closed,
            'name' => $this->name,
//            'position' => $this->position
        ];
    }
}
