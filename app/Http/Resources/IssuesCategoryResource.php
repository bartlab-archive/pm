<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class IssuesCategoryResource extends Resource
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
            'assigned' => UserResource::make($this->whenLoaded('assigned')),
            'issues' => IssueResource::collection($this->whenLoaded('issues')),
            'project' => ProjectResource::make($this->whenLoaded('project')),
        ];
    }
}
