<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class JournalResource extends Resource
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
            'created_on' => $this->created_on->format('Y-m-d H:i:s'),
            'notes' => (!$this->private_notes || ($this->user_id === \Auth::id())) ? $this->notes : '',
            'user' => UserResource::make($this->whenLoaded('user')),
            'details' => JournalDetailResource::collection($this->whenLoaded('details')),
            // show private flag
            $this->mergeWhen($this->private_notes && $this->user_id === \Auth::id(), [
                'private' => true
            ])
        ];
    }
}
