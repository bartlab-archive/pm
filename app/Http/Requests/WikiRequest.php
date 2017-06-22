<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\WikiPage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

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

        $project = Auth::user()->projects()->where('identifier', $this->route('identifier'))->firstOrFail();
        $wiki = $project->wiki;

        return [
            'title' => [
                'required',
                Rule::unique((new WikiPage())->getTable(), 'title')->where('wiki_id', $wiki->id)
            ],
            'text' => 'required|string',
        ];
    }
}



