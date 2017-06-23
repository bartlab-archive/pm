<?php

namespace App\Http\Requests;

use App\Models\EmailAddresses;
use App\Models\UserPreference;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
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
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',

                //This rule validates the exists email address ignore user email
                'email' => Rule::unique(
                    EmailAddresses::getTableName(),
                    'address'
                )->ignore(Auth::id(), 'user_id')
            ],
            'lang' => 'required|string',
            'hide_mail' => 'required|boolean',
            'time_zone' => 'required|string|in:' . implode(',', array_keys(UserPreference::TIME_ZONE_MAP)),
            'comments_sorting' => 'required|string|in:asc,desc',
            'no_self_notified' => 'required|int|in:0,1',
            'warn_on_leaving_unsaved' => 'required|int|in:0,1'
        ];
    }
}
