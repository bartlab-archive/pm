<?php

namespace App\Http\Controllers\Auth;

use App\Models\EmailAddresses;
use App\Models\Setting;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\UserPreference;
use Illuminate\Http\Request;

/**
 * Class RegisterController
 * @package App\Http\Controllers\Auth
 */
class RegisterController extends Controller
{
    /**
     * Checking administrator setting for registration
     *
     * RegisterController constructor.
     */
    public function __construct()
    {
        //TODO: take out check permission at middleware class
        $this->permission(
            Setting::where('name', Setting::setting_register_name)
                ->first(['value'])
                ->value
        );
    }

    /**
     * Register user
     *
     * This method create user and user relationships
     *
     * @url protocol://ip:port/api/v1/register
     *
     * @example Request $request {
     *     "first_name": "test",
     *     "last_name": "test",
     *     "login": "dev",
     *     "email": "test@mail.ua",
     *     "password": "qwerty",
     *     "repeat_password": "qwerty",
     *     "lang": "ru",
     *     "hide_email": "0"
     *}
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $this->validate($request, $this->rules(), $this->messages());

        $salt = str_random(33);

        /**
         * Create new User
         */
        $user = User::create([
            'login' => $request->input('login'),
            'firstname' => $request->input('first_name'),
            'lastname' => $request->input('last_name'),
            'salt' => $salt,
            'hashed_password' => sha1($salt . sha1($request->input('password')))
        ]);

        /**
         * Create user email relationship
         */
        EmailAddresses::create([
            'user_id' => $user->id,
            'address' => $request->input('email')
        ]);

        /**
         * Create user preference relationship
         */
        $user_reference = UserPreference::create([
            'user_id' => $user->id,
            'hide_mail' => $request->input('hide_email', 0)
        ]);

        /**
         * Add the default serialized data
         */
        UserPreference::updateOthers($user_reference);

        return response(null, 201);
    }

    /**
     * Rules validation request params
     *
     * This method returns rules for user registration and user relationships
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'login' => 'required|string|max:255|unique:' . (new User())->getTable(),
            'email' => 'required|string|email|max:255|unique:' . (new EmailAddresses())->getTable() . ',address',
            'password' => 'required|string|min:6',
            'repeat_password' => 'required|string|min:6|same:password',
            'lang' => 'required|string|max:2',
            'hide_email' => 'int|in:1,0'
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

    /**
     * Permission registration
     *
     * This method check administrator setting for registration
     *
     * @param int $register_status
     */
    protected function permission(int $register_status)
    {
        switch ($register_status) {
            case Setting::self_registration_account_activation_by_email:
                //TODO: уточнить логику для статуса настройки регистрации self_registration_account_activation_by_email
                break;
            case Setting::self_registration_automatic_account_activation:
                //TODO: уточнить логику для статуса настройки регистрации self_registration_automatic_account_activation
                break;
            default:
                /**
                 * @internal forbidden registration by
                 */
                abort(403);
        }
    }
}
