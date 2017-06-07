<?php

namespace App\Http\Controllers\My\Account;

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
class AccountController extends Controller implements IAccountController
{
    /**
     * @see IAccountController::show
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
     * @see IAccountController::update
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

        $this->validate($request, $this->rules($user), $this->messages());

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
     * Rules
     *
     * This method returns rules the specific route
     *
     * @param User|null $user
     * @return array
     */
    protected function rules(User $user)
    {
        return [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'email' => Rule::unique((new EmailAddresses())->getTable(), 'address')->ignore($user->id, 'user_id') //This rule validates the exists email address ignore user email
            ],
            'lang' => 'required|string|max:2',
            'hide_email' => 'required|boolean',
            'time_zone' => 'required|string',
            'comments_sorting' => 'required|string|in:asc,desc',
            'no_self_notified' => 'required|boolean',
            'warn_on_leaving_unsaved' => 'required|boolean'
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
        return [];
    }
}