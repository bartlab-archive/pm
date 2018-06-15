<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class TokenResource extends Resource
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
            'user' => UserResource::make($this->whenLoaded('user')),
            'value' => $this->value
        ];
    }

}
