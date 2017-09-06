<?php

namespace App\Http\Requests\Enumerations;

use App\Models\Board;
use App\Models\Enumeration;
use Illuminate\Foundation\Http\FormRequest;

class EnumerationsRequest extends FormRequest
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
            'name' => 'required|string|max:30',
            'position' => 'required|int',
            'is_default' => 'required|boolean',
            'type' => 'required|string|max:25',
            'active' => 'required|boolean',
            'parent_id' => 'exists:' . Enumeration::getTableName() .',id',
            'position_name' => 'nullable|string|max:30',
        ];
    }
}
