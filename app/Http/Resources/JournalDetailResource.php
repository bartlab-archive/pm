<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class JournalDetailResource extends Resource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        // todo: convert value from id to text by type
        return [
            'property' => $this->property,
            'prop_key' => $this->prop_key,
            'old_value' => $this->prop_key === 'project_id' ? '...' : $this->old_value,
            'value' => $this->prop_key === 'project_id' ? '...' : $this->value,
        ];
    }
}
