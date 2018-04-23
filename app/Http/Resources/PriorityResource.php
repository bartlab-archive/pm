<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class PriorityResource extends Resource
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
            'position' => $this->position,
            'is_default' => $this->is_default,
//            'type' => $this->type,
            'active' => $this->active,
//            'parent_id' => $this->parent_id,
//            'position_name' => $this->position_name,
//            'project' => $this->project
        ];
    }
}
