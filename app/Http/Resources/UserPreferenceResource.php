<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class UserPreferenceResource extends Resource
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
//            'id' => $this->id,
//            'full_name' => $this->full_name,
//            'avatar' => $this->avatar,
//            'admin' => $this->admin,
            'others' => $this->others,
            'hide_mail' => $this->hide_mail,
            'time_zone' => $this->time_zone,
        ];
    }
}
