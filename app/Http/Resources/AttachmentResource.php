<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class AttachmentResource extends Resource
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
            'filename' => $this->filename,
            'description' => $this->description,
        ];
    }
}
