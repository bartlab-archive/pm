<?php

namespace App\Http\Requests\Issues;

class UpdateIssueRequest extends CreateIssueRequest
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
        return array_merge(
            parent::rules(),
            [
                'notes' => 'string|nullable',
                'private_notes' => 'boolean',
            ]
        );
    }
}