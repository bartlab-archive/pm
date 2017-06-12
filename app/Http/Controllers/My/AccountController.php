<?php

namespace App\Http\Controllers\My;


use App\Http\Traits\PasswordTrait;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\EmailAddresses;
use App\Models\UserPreference;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

/**
 * Class AccountController
 *
 * @package App\Http\Controllers\My
 */
class AccountController extends Controller
{
    use PasswordTrait;

    /**
     * Show
     *
     * This method passes the user info
     *
     * @example response {
     *     "firstname": "Test",
     *     "lastname": "Dev",
     *     "login": "test",
     *     "lang": "ru",
     *     "created": "2017-06-06 10:44:00",
     *     "email": "test@mail.ua",
     *     "hide_email": "0",
     *     "time_zone": "Kyiv",
     * }
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        $user = User::userByHeaderAuthToken($request);
        $user_email_address = $user->email;
        $user_preference = $user->preference;
        $account_info = [];

        if ($user) {
            $account_info['firstname'] = $user->getAttribute('firstname');
            $account_info['lastname'] = $user->getAttribute('lastname');
            $account_info['login'] = $user->getAttribute('login');
            $account_info['lang'] = $user->getAttribute('lang');
            $account_info['created'] = $user->getAttribute('created');
            $account_info['must_change_passwd'] = $user->getAttribute('must_change_passwd');
        }

        if ($user_email_address) {
            $account_info['email'] = $user_email_address->getAttribute('address');
        }

        if ($user_preference) {
            $account_info['hide_email'] = $user_preference->getAttribute('hide_email');
            $account_info['time_zone'] = $user_preference->getAttribute('time_zone');

            $account_info = array_merge($account_info, UserPreference::parseOthers($user_preference));
        }

        //TODO:: pass all user info after search and analyze database tables

        return response()->json($account_info);
    }

    /**
     * Update
     *
     * This method updates the user info
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function update(Request $request)
    {
        /**
         * @todo: add other rules after analyzed the database tables. Tables which contains the user info
         * @todo: updated all the user info field
         */

        $user = User::userByHeaderAuthToken($request);

        $this->validate($request, $this->rules($user)['update'], $this->messages()['update']);

        $user->update([
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
            'language' => $request->input('lang')
        ]);

        $user_email_address = $user->email;

        if ($user_email_address) {
            $user_email_address->update([
                'address' => $request->input('email')
            ]);
        }

        $user_preference = $user->preference;

        if ($user_preference) {
            $user_preference->update([
                'hide_email' => $request->input('hide_email'),
                'time_zone' => $request->input('time_zone')
            ]);

            UserPreference::updateOthers($user_preference, [
                'no_self_notified' => $request->input('no_self_notified'),
                'comments_sorting' => $request->input('comments_sorting'),
                'warn_on_leaving_unsaved' => $request->input('warn_on_leaving_unsaved'),
            ]);
        }

        return response(null, 204);
    }

    /**
     * Change Password
     *
     * This method creates new password the user
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function changePassword(Request $request)
    {
        $this->validate($request, $this->rules()['change_password'], $this->messages()['change_password']);

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
     * This method returns rules the specific route
     *
     * @param User|null $user
     * @return array
     */
    protected function rules(User $user = null)
    {
        $update = [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255'
            ],
            'lang' => 'required|string|max:2',
            'hide_email' => 'required|boolean',
            'time_zone' => 'required|string',
            'comments_sorting' => 'required|string|in:asc,desc',
            'no_self_notified' => 'required|boolean',
            'warn_on_leaving_unsaved' => 'required|boolean'
        ];

        if ($user) {
            /**
             * Validate updated the email address
             *
             * This rule validates the exists email address ignore user email
             */
            $update['email'] = array_merge($update['email'], ['email' => Rule::unique((new EmailAddresses())->getTable(), 'address')->ignore($user->id, 'user_id')]);
        }

        $change_password = [
            'password' => 'required|string',
            'new_password' => 'required|string|min:6|different:password',
            'confirm_new_password' => 'required|string|min:6|same:new_password'
        ];

        return [
            'update' => $update,
            'change_password' => $change_password
        ];
    }

    /**
     * Messages
     *
     * This method returns messages on the rules by specific route
     *
     * @return array
     */
    protected function messages()
    {
        return [
            'update' => [],
            'change_password' => []
        ];
    }
}