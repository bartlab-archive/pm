<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class WikiResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'project' => ProjectResource::make($this->whenLoaded('project')),
            'start_page' => $this->start_page,
            'status' => $this->status
        ];
    }
}
