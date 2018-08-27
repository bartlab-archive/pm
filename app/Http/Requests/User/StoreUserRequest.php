<?php

namespace App\Http\Requests\User;

use App\Models\EmailAddress;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
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
            'login' => [
                'required',
                'string',
                'max:60',
                'unique:' . User::getTableName(),
                'regex:/^[a-z0-9_\-@\.]*$/i'
            ],
            // todo: Minimum password length from settings
            'password' => 'required|string|min:6',
            'repeat_rassword' => 'required|string|same:password',
            'firstname' => 'required|string|max:30',
            'lastname' => 'required|string|max:30',
            'email' => [
                'required',
//                'string',
                'email',
                'max:60',
                //This rule validates the exists email address ignore user email
                Rule::unique(EmailAddress::getTableName(), 'address')
            ],
            'language' => [
//                'required',
                'string',
                Rule::in(array_column(config('langs'), 'id')),
            ],

            'mail_notification' => [
//                'string',
                Rule::in(array_column(User::$NOTIFICATIONS, 'value'))
            ],
            'hide_mail' => 'boolean',
            'time_zone' => [
                'nullable',
//                'string',
                Rule::in(array_column(config('timezones'), 'value')),
            ],
            'comments_sorting' => 'in:asc,desc',
            'no_self_notified' => 'boolean',
            'warn_on_leaving_unsaved' => 'boolean',

            'admin' => 'boolean',
            'send_information' => 'boolean'
        ];
    }
}
