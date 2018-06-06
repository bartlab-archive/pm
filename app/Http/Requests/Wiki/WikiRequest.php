<?php

namespace App\Http\Requests\Wiki;

use Illuminate\Foundation\Http\FormRequest;

class WikiRequest extends FormRequest
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
            'start_page' => [
                'required',
                'string',
                'max:255',
                'regex:/^[^,\.\/\?\;\:\|\s]*$/'
            ],
        ];
    }
}
