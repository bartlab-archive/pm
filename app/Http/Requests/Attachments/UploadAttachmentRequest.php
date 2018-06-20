<?php

namespace App\Http\Requests\Attachments;

use Illuminate\Foundation\Http\FormRequest;

class UploadAttachmentRequest extends FormRequest {
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
            'file_name' => 'required|string|min:4|max:25',
            'file_total_size' => 'required|integer',
            'chunk_amount' => 'required|integer',
            'file_chunk_id' => 'required|integer',
            'file_total_size' => 'required|integer',
            'description' => 'string|max:255'
        ];
    }


}