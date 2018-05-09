<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class WatcherResource extends Resource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
//        return parent::toArray($request);
        return [
            'id' => $this->watchable_id,
            'type' => $this->watchable_type,
            'user_id' => $this->user_id,
        ];
    }
}
