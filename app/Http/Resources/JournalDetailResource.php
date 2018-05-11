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
        return [
            'property' => $this->property,
            'prop_key' => $this->prop_key,
            'old_value' => $this->old_value,
            'value' => $this->value,
        ];
    }
}
