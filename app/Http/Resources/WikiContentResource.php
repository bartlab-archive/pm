<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class WikiContentResource extends Resource
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
            'text' => $this->text,
            'updated_on' => $this->updated_on->format('Y-m-d H:i:s'),
            'author' => UserResource::make($this->whenLoaded('author')),
        ];
    }
}
