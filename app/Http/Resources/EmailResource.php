<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class EmailResource extends Resource
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
            'address' => $this->address,
            'is_default' => $this->is_default,
            'notify' => $this->notify,
        ];
    }

}
