<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class WikiPageResource extends Resource
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
            'title' => $this->title,
            'parent_id' => $this->parent_id,
//            'parent' => self::make($this->whenLoaded('parent')),
//            'childs' => self::collection($this->whenLoaded('childs')),
            'parents_ids' => $this->parents_ids,
            'protected' => $this->protected,
            'created_on' => $this->created_on ? $this->created_on->format('Y-m-d H:i:s') : null,
            'content' => WikiContentResource::make($this->whenLoaded('content')),
            'is_watcheble' => $this->whenLoaded('watchers', function () {
                return $this->watchers->contains('id', \Auth::id());
            }),
        ];
    }
}
