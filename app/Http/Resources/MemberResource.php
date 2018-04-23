<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class MemberResource extends Resource
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
            'user' => UserResource::make($this->whenLoaded('user')),
            'roles' => RolesResource::collection($this->whenLoaded('roles'))
        ];
    }
}
