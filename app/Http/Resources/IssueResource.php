<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class IssueResource extends Resource
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
            'tracker_id' => $this->tracker_id,
            'subject' => $this->subject,
            'description' => $this->description,
            'due_date' => $this->due_date,
            'category_id' => $this->category_id,
            'status_id' => $this->status_id,
            'assigned_to_id' => $this->assigned_to_id,
            'priority_id' => $this->priority_id,
            'fixed_version_id' => $this->fixed_version_id,
            'author_id' => $this->author_id,
            'lock_version' => $this->lock_version,
            'created_on' => $this->created_on->format('Y-m-d H:i:s'),
            'updated_on' => $this->updated_on->format('Y-m-d H:i:s'),
            'start_date' => $this->start_date,
            'done_ratio' => $this->done_ratio,
            'estimated_hours' => $this->estimated_hours,
            'parent_id' => $this->parent_id,
            'root_id' => $this->root_id,
            'is_private' => $this->is_private,
            'closed_on' => $this->closed_on,
            'ordering' => $this->ordering ?? '',
            'tracker' => TrackerResource::make($this->whenLoaded('tracker')),
            'project' => ProjectResource::make($this->whenLoaded('project')),
            'assigned' => UserResource::make($this->whenLoaded('assigned')),
            'author' => UserResource::make($this->whenLoaded('author')),
            'status' => StatusResource::make($this->whenLoaded('status')),
//            'version' => StatusResource::make($this->whenLoaded('version')),
//            'category' => StatusResource::make($this->whenLoaded('category')),
            'priority' => PriorityResource::make($this->whenLoaded('priority')),
        ];
    }

    public function with($request)
    {
        return [
            'groups' => $this->resource->groups,
        ];
    }
}