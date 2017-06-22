<?php

namespace App\Http\Controllers\My\ChangePassword;

use App\Http\Controllers\Controller;
use App\Traits\PasswordTrait;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * Class ChangePassword
 *
 * @package App\Http\Controllers\My\ChangePassword
 */
class ChangePasswordController extends Controller implements IChangePasswordController
{
    use PasswordTrait;

    /**
     * @see IChangePasswordController::changePassword
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function changePassword(Request $request)
    {
        $this->validate($request, $this->rules(), $this->messages());

        $user = User::userByHeaderAuthToken($request);
        $pass = $this->preparePassword($user, $request->input('password'));

        if ($pass !== $user->hashed_password) {
            return response()->json(['password' => 'Invalid credentials.'], 422);
        }

        $this->resetPassword($user, $request->input('new_password'));

        $user->update(['passwd_changed_on' => date('Y-m-d H:i:s')]);

        return response(null, 204);
    }

    /**
     * Rules
     *
     * This method returns rules
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'password' => 'required|string',
            'new_password' => 'required|string|min:6|different:password',
            'confirm_new_password' => 'required|string|min:6|same:new_password'
        ];
    }

    /**
     * Messages
     *
     * This method returns messages on the rules
     *
     * @return array
     */
    protected function messages()
    {
        return [];
    }
}