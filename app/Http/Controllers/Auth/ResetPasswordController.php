<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Traits\PasswordTrait;
use App\Models\EmailAddresses;
use Illuminate\Http\Request;

/**
 * Class ResetPasswordController
 *
 * @package App\Http\Controllers\Auth
 */
class ResetPasswordController extends Controller
{
    use PasswordTrait;

    /**
     * @todo not valid logic
     */

    /*
     * Send token
     *
     * This method sends the invite on request email
     */
    public function sendToken(Request $request)
    {
        $this->validate($request, $this->rules()['send_token'], $this->messages()['send_token']);
    }

    public function reset(Request $request)
    {

    }
    
    protected function rules()
    {
        return [
            'send_token' => [
                'email' => 'required|string|email|exists:' . (new EmailAddresses())->getTable() . ',address'
            ],
            'reset' => []
        ];
    }

    protected function messages()
    {
        return [
            'send_token' => [],
            'reset' => []
        ];
    }
}
