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
            'title' => $this->title,
            'created_on' => $this->created_on->format('Y-m-d H:i:s'),
            'content' => WikiContentResource::make($this->whenLoaded('content')),
        ];
    }
}
