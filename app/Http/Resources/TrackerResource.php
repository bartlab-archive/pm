<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class TrackerResource extends Resource
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
            'is_in_chlog' => $this->is_in_chlog,
            'position' => $this->position,
            'is_in_roadmap' => $this->is_in_roadmap,
            'fields_bits' => $this->fields_bits,
            'default_status_id' => $this->default_status_id
        ];
    }
}
