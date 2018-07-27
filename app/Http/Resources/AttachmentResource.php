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
            'filesize' => $this->filesize,
            'content_type' => $this->content_type,
            'author' => UserResource::make($this->whenLoaded('author')),
//            'created_on' => $this->created_on->format('Y-m-d H:i:s'),
            $this->mergeWhen(!empty($this->created_on), function () {
                return [
                    'created_on' => $this->created_on->format('Y-m-d H:i:s')
                ];
            })
        ];
    }
}
