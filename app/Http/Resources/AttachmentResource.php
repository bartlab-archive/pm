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
            'container_id' => $this->name,
            'containter_type' => $this->container_type,
            'filename' => $this->filename,
            'author_id' => $this->author_id,
            'description' => $this->description,
            'disk_directory' => $this->disk_directory
        ];
    }
}
