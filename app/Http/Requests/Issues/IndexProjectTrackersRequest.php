<?php

namespace App\Http\Requests\Issues;

use App\Models\Tracker;
use Illuminate\Foundation\Http\FormRequest;

class IndexProjectTrackersRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'trackers' => 'array',
            'trackers.*.id' => 'integer|exists:' . Tracker::getTableName() . ',id',
            'trackers.*.enable' => 'boolean',
        ];
    }
}