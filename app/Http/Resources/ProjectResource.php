<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class ProjectResource extends Resource
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
            'name' => $this->name,
            'description' => $this->description,
            'homepage' => $this->homepage,
            'parent_id' => $this->parent_id,
            'is_public' => $this->is_public,
            'inherit_members' => $this->inherit_members,
            'default_version_id' => $this->default_version_id,
//            'created_on' => $this->created_on->format('Y-m-d H:i:s'),
//            'updated_on' => $this->updated_on->format('Y-m-d H:i:s'),
            'identifier' => $this->identifier,
            'status' => $this->status,
            'is_my' => $this->is_my,
            'users' => UserResource::collection($this->whenLoaded('users')),
            'trackers' => TrackerResource::collection($this->whenLoaded('trackers')),
        ];
    }
}
