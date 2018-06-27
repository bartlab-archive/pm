<?php

namespace App\Http\Requests\Account;

//use App\Rules\UserPassword;
use Illuminate\Foundation\Http\FormRequest;
//use Illuminate\Support\Facades\Auth;

class ChangePasswordRequest extends FormRequest
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
//            'password' => ['required', 'string', new UserPassword],
            'new_password' => 'required|string|min:6|different:password',
            'confirm_new_password' => 'required|string|min:6|same:new_password'
        ];
    }
}
