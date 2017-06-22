<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateAccountRequest;
use App\Models\User;
use App\Services\AccountService;
use Illuminate\Support\Facades\Auth;

/**
 * Class AccountController
 */
class AccountController extends Controller
{

    protected $accountService;

    public function __construct(AccountService $accountService)
    {
        $this->accountService = $accountService;
    }

    public function show()
    {
//        $user = Auth::user();//$this->userService::byToken($request->bearerToken());

//        return response($this->buildAccountInfoResponseData($user, $user->email, $user->preference));
        return $this->accountService->get();
    }

    public function update(UpdateAccountRequest $request)
    {
        /**
         * @todo: add other rules after analyzed the database tables. Tables which contains the user info
         * @todo: updated all the user info field
         */
//        $user = User::userByHeaderAuthToken($request);

//        $this->validate($request, $this->rules($user), $this->messages());

        $this->accountService->update($request->all());


//        $user_email_address = $user->email;
//
//        if ($user_email_address) {
//            $user_email_address->update([
//                'address' => $request->input('email')
//            ]);
//        }
//
//        $user_preference = $user->preference;
//
//        if ($user_preference) {
//            $user_preference->update([
//                'hide_mail' => $request->input('hide_mail'),
//                'time_zone' => $request->input('time_zone')
//            ]);
//
//            UserPreference::updateOthers($user_preference, [
//                'no_self_notified' => $request->input('no_self_notified'),
//                'comments_sorting' => $request->input('comments_sorting'),
//                'warn_on_leaving_unsaved' => $request->input('warn_on_leaving_unsaved'),
//            ]);
//        }
//
//        return response($this->buildAccountInfoResponseData($user, $user_email_address, $user_preference));
    }

//    private function buildAccountInfoResponseData(User $user, EmailAddresses $user_email_address = null, UserPreference $user_preference = null)
//    {
//        $account_info = [];
//        $default_tz = \Config::get('app.timezone');
//
//        $account_info['firstname'] = $user->firstname;
//        $account_info['lastname'] = $user->lastname;
//        $account_info['login'] = $user->login;
//        $account_info['lang'] = $user->language;
//        $account_info['must_change_passwd'] = !!$user->must_change_passwd;
//        $account_info['mail_notification'] = $user->mail_notification;
//
//        $api_key = Token::apiKey($user);
//        $atom_key = Token::atomKey($user);
//
//        $defaultBuildDates = function () use (&$account_info, $user, $api_key, $atom_key)
//        {
//            $account_info['created'] = date($user->created_on);
//            $account_info['api_key_updated_on'] = $api_key ? date($api_key->updated_on) : null;
//            $account_info['atom_key_updated_on'] = $atom_key ? date($atom_key->updated_on) : null;
//        };
//
//        if ($user_email_address) {
//            $account_info['email'] = $user_email_address->address;
//        }
//
//        if ($user_preference) {
//            $account_info['hide_mail'] = !!$user_preference->hide_mail;
//            $account_info['time_zone'] = $user_preference->time_zone;
//
//            if ($account_info['time_zone'] && $account_info['time_zone'] !== $default_tz) {
//                $tz = UserPreference::TIME_ZONE_MAP[$account_info['time_zone']];
//                $format = 'Y-m-d H:i:s';
//
//                $account_info['created'] = date_timezone_set(date_create($user->created_on), timezone_open($tz))->format($format);
//                $account_info['api_key_updated_on'] = $api_key ? date_timezone_set(date_create($api_key->updated_on), timezone_open($tz))->format($format) : null;
//                $account_info['atom_key_updated_on'] = $atom_key ? date_timezone_set(date_create($atom_key->updated_on), timezone_open($tz))->format($format) : null;
//
//            } else {
//                $defaultBuildDates();
//            }
//
//            $account_info = array_merge($account_info, UserPreference::parseOthers($user_preference));
//        } else {
//            $defaultBuildDates();
//        }
//
//        return $account_info;
//    }

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
     * @see IKeysController::showApiKey
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function showApiKey(Request $request)
    {
        $user = User::userByHeaderAuthToken($request);
        $user_api_key = Token::apiKey($user);

        if (is_null($user_api_key)) {
            $user_api_key = Token::createApiKey($user);
        }

        return response($this->buildResponse($user, $user_api_key));
    }

    /**
     * @see IKeysController::resetApiKey
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function resetApiKey(Request $request)
    {
        $user = User::userByHeaderAuthToken($request);
        $user_api_key = Token::apiKey($user);

        if (is_null($user_api_key)) {
            $user_api_key = Token::createApiKey($user);
        } else {
            $user_api_key->value = sha1(str_random(33));
            $user_api_key->save();
        }

        return response($this->buildResponse($user, $user_api_key)['updated_on']);
    }

    /**
     * @see IKeysController::resetAtomKey
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function resetAtomKey(Request $request)
    {
        $user = User::userByHeaderAuthToken($request);
        $user_atom_key = Token::atomKey($user);

        if (is_null($user_atom_key)) {
            $user_atom_key = Token::createAtomKey($user);
        } else {
            $user_atom_key->value = sha1(str_random(33));
            $user_atom_key->save();
        }

        return response($this->buildResponse($user, $user_atom_key)['updated_on']);
    }

    /**
     * Build response
     *
     * This method returns the key data
     *
     * @param User $user
     * @param Token $token
     * @return array
     */
    private function buildResponse(User $user, Token $token)
    {
        $default_tz = \Config::get('app.timezone');
        $user_preference = $user->preference;
        $tz = UserPreference::TIME_ZONE_MAP[$user_preference->time_zone];
        $format = 'Y-m-d H:i:s';

        return [
            'api_key' => $token->value,
            'updated_on' => ($tz && $tz !== $default_tz) ? date_timezone_set(date_create($token->updated_on), timezone_open($tz))->format($format) : date($token->updated_on)
        ];
    }
}