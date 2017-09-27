<?php

namespace App\Http\Requests\Versions;

use Illuminate\Foundation\Http\FormRequest;

class VersionsRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
            'wiki_page_title' => 'string|max:255',
            'status' => 'string|max:255',
            'sharing' => 'string|max:255',
            'effective_date' => 'date_format:Y-m-d',
        ];
    }
}
