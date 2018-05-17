<?php

namespace App\Http\Requests\Wiki;

use App\Models\User;
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
            'comment' => 'nullable|string',
            'content' => 'string|max:1024',
            'parent_id' => 'nullable|int|exists:' . WikiPage::getTableName() . ',id',
            'title' => 'string|max:255'
        ];
    }
}
