<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\EmailAddresses;
use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

/**
 * Class LoginController
 * @package App\Http\Controllers\Auth
 */
class LoginController extends Controller
{
    /**
     * Authorization user in system
     *
     * @url protocol://ip:port/api/v1/login
     *
     * @example {
     *     "email": "test@mail.ua",
     *     "password": "qwerty"
     * }
     * 
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function login(Request $request)
    {
        $this->validate($request, $this->rules(), $this->messages());

        $user = User::where('login', $request->input('login'))->first();

        $pass = $this->preparePassword($user, $request);

        if ($pass !== $user->hashed_password) {
            return response(null, 400);
        }

        return response()->json(['token' => sha1($user->hashed_password)]);
    }

    /**
     * Request param password concatenate with user unique salt
     *
     * @param $user
     * @param $request
     * @return string
     */
    protected function preparePassword($user, $request)
    {
        return sha1($user->salt . sha1($request->input('password')));
    }

    /**
     * Rules validation request params
     *
     * This method returns rules for user authorization
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'login' => 'required|string|max:255|exists:' . (new User())->getTable(),
            'password' => 'required|string|min:6'
        ];
    }

    /**
     * Messages for rules validation
     *
     * This method describes the text message for rules
     *
     * @return array
     */
    protected function messages()
    {
        return [];
    }
}
