<?php

namespace App\Http\Requests\Wiki;

use App\Models\WikiPage;
use Illuminate\Foundation\Http\FormRequest;

class CreateWikiRequest extends FormRequest
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
            'title' => 'string|max:255',
            'content' => 'string|max:1024',
            // todo: check parent_id and project
            'parent_id' => 'nullable|int|exists:' . WikiPage::getTableName() . ',id',
            'comment' => 'nullable|string'
        ];
    }
}
