<?php

namespace App\Http\Resources;

use App\Services\ProjectsService;
use Illuminate\Http\Resources\Json\Resource;
use App\Models\Project;

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
            'name' => $this->name,//.time(),
            'description' => $this->description,
            'homepage' => $this->homepage,
            'parent' => self::make($this->whenLoaded('parent')),
            'is_public' => $this->is_public,
            'inherit_members' => $this->inherit_members,
            'default_version_id' => $this->default_version_id,
//            'created_on' => $this->created_on->format('Y-m-d H:i:s'),
//            'updated_on' => $this->updated_on->format('Y-m-d H:i:s'),
            'identifier' => $this->identifier,
            'status' => $this->status,
            'is_my' => $this->is_my,
            'members' => MemberResource::collection($this->whenLoaded('members')),
//        'members'=>$this->members,
            'trackers' => TrackerResource::collection($this->whenLoaded('trackers')),
            'modules' => ModuleResource::collection($this->whenLoaded('enabledModules')),
        ];
    }
}
