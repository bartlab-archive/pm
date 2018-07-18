<?php

namespace App\Http\Requests\Projects;

use Illuminate\Foundation\Http\FormRequest;

class IndexProjectRequest extends FormRequest
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
            'public' => 'array',
            'public.*' => 'numeric|in:1,0',
            'status_ids' => 'array',
            // todo: status_ids depends on user admin status
            'status_ids.*' => 'numeric|in:1,5,9',
            'order' => 'string',
            'per_page' => 'numeric',
            'page' => 'numeric',
        ];
    }
}
