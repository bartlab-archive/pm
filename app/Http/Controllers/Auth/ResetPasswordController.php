<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;

class ResetPasswordController extends Controller
{   
    use ResetsPasswords;

    public function sendToken(Request $request)
    {

    }

    public function reset(Request $request)
    {

    }
    
    protected function rules()
    {
        return [
            'send_token' => [
                'email' => ''
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
