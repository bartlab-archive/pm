<?php

namespace App\Http\Requests\Account;

use App\Models\EmailAddress;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateEmailAccountRequest extends FormRequest
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
            'email' => [
                'required',
//                'string',
                'email',
                'max:60',
                //This rule validates the exists email address ignore user email
                Rule::unique(EmailAddress::getTableName(), 'address')
            ]
        ];
    }
}
