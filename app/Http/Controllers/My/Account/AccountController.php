<?php

namespace App\Http\Controllers\My\Account;

use App\Http\Controllers\Controller;
use App\Models\Token;
use App\Models\User;
use App\Models\EmailAddresses;
use App\Models\UserPreference;
use Carbon\Carbon;
use Faker\Provider\zh_TW\DateTime;
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
     * @example Response $response {
     *     "firstname": "test",
     *     "lastname": "test",
     *     "login": "dev1",
     *     "lang": "ru",
     *     "must_change_passwd": 0,
     *     "mail_notification": "",
     *     "email": "test@mail.ua",
     *     "hide_mail": 0,
     *     "time_zone": "Kyiv",
     *     "created": "2017-06-06 15:24:56",
     *     "api_key_updated_on": "2017-06-07 17:39:08",
     *     "atom_key_updated_on": "2017-06-07 17:42:27",
     *     "no_self_notified": 0,
     *     "comments_sorting": "asc",
     *     "warn_on_leaving_unsaved": 1
     * }
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        $user = User::userByHeaderAuthToken($request);

        return response($this->buildAccountInfoResponseData($user, $user->email, $user->preference));
    }

    /**
     * @see IAccountController::update
     * @example Request $request {
     *     "firstname": "test",
     *     "lastname": "test",
     *     "login": "dev1",
     *     "lang": "ru",
     *     "must_change_passwd": 0,
     *     "mail_notification": "",
     *     "email": "test@mail.ua",
     *     "hide_mail": 0,
     *     "time_zone": "Kyiv",
     *     "created": "2017-06-06 15:24:56",
     *     "api_key_updated_on": "2017-06-07 17:39:08",
     *     "atom_key_updated_on": "2017-06-07 17:42:27",
     *     "no_self_notified": 1,
     *     "comments_sorting": "asc",
     *     "warn_on_leaving_unsaved": 1
     *  }
     * @example Response $response {
     *     "firstname": "test",
     *     "lastname": "test",
     *     "login": "dev1",
     *     "lang": "ru",
     *     "must_change_passwd": 0,
     *     "mail_notification": "",
     *     "email": "test@mail.ua",
     *     "hide_mail": 0,
     *     "time_zone": "Kyiv",
     *     "created": "2017-06-06 15:24:56",
     *     "api_key_updated_on": "2017-06-07 17:39:08",
     *     "atom_key_updated_on": "2017-06-07 17:42:27",
     *     "no_self_notified": 1,
     *     "comments_sorting": "asc",
     *     "warn_on_leaving_unsaved": 1
     *  }
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
                'hide_mail' => $request->input('hide_mail'),
                'time_zone' => $request->input('time_zone')
            ]);

            UserPreference::updateOthers($user_preference, [
                'no_self_notified' => $request->input('no_self_notified'),
                'comments_sorting' => $request->input('comments_sorting'),
                'warn_on_leaving_unsaved' => $request->input('warn_on_leaving_unsaved'),
            ]);
        }

        return response($this->buildAccountInfoResponseData($user, $user_email_address, $user_preference));
    }

    /**
     * Build account info response data
     *
     * This method returns the info data for account
     *
     * @param User $user
     * @param EmailAddresses|null $user_email_address
     * @param UserPreference|null $user_preference
     * @return array
     */
    private function buildAccountInfoResponseData(User $user, EmailAddresses $user_email_address = null, UserPreference $user_preference = null)
    {
        $account_info = [];
        $default_tz = \Config::get('app.timezone');

        $account_info['firstname'] = $user->firstname;
        $account_info['lastname'] = $user->lastname;
        $account_info['login'] = $user->login;
        $account_info['lang'] = $user->language;
        $account_info['must_change_passwd'] = !!$user->must_change_passwd;
        $account_info['mail_notification'] = $user->mail_notification;

        $api_key = Token::apiKey($user);
        $atom_key = Token::atomKey($user);

        $defaultBuildDates = function () use (&$account_info, $user, $api_key, $atom_key)
        {
            $account_info['created'] = date($user->created_on);
            $account_info['api_key_updated_on'] = $api_key ? date($api_key->updated_on) : null;
            $account_info['atom_key_updated_on'] = $atom_key ? date($atom_key->updated_on) : null;
        };

        if ($user_email_address) {
            $account_info['email'] = $user_email_address->address;
        }

        if ($user_preference) {
            $account_info['hide_mail'] = !!$user_preference->hide_mail;
            $account_info['time_zone'] = $user_preference->time_zone;

            if ($account_info['time_zone'] && $account_info['time_zone'] !== $default_tz) {
                $tz = UserPreference::TIME_ZONE_MAP[$account_info['time_zone']];
                $format = 'Y-m-d H:i:s';

                $account_info['created'] = date_timezone_set(date_create($user->created_on), timezone_open($tz))->format($format);
                $account_info['api_key_updated_on'] = $api_key ? date_timezone_set(date_create($api_key->updated_on), timezone_open($tz))->format($format) : null;
                $account_info['atom_key_updated_on'] = $atom_key ? date_timezone_set(date_create($atom_key->updated_on), timezone_open($tz))->format($format) : null;

            } else {
                $defaultBuildDates();
            }

            $account_info = array_merge($account_info, UserPreference::parseOthers($user_preference));
        } else {
            $defaultBuildDates();
        }

        return $account_info;
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
            'lang' => 'required|string',
            'hide_mail' => 'required|boolean',
            'time_zone' => 'required|string|in:' . implode(',', array_keys(UserPreference::TIME_ZONE_MAP)),
            'comments_sorting' => 'required|string|in:asc,desc',
            'no_self_notified' => 'required|int|in:0,1',
            'warn_on_leaving_unsaved' => 'required|int|in:0,1'
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