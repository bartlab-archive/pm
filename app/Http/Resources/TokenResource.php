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
            'action' => $this->action,
            'value' => $this->value,
            'updated_on' => $this->updated_on->format('Y-m-d H:i:s'),
        ];
    }

}
