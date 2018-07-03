<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class UserResource extends Resource
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
            'full_name' => $this->full_name,
            'avatar' => $this->avatar,
            // todo: remove this field for respons to non admin user
            $this->mergeWhen($this->admin, ['request' => $this->admin]),
//            'request' => $this->admin,
            'is_group' => $this->type !== 'User'
        ];
    }
}
