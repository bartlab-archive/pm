<?php

namespace App\Services;


use App\Models\UserPreference;
use App\Traits\PasswordTrait;
use App\Interfaces\IAuthService;
use App\Models\EmailAddresses;
use App\Models\Token;
use App\Models\User;
use Illuminate\Http\Request;

class AuthService implements IAuthService
{
    use PasswordTrait;

    public function login(Request $request): Token
    {
        $login = $request->input('login');
        $user_by_login = User::where('login', $login)->first();
        $user_by_email = EmailAddresses::where('address', $login)->first();

        if (is_null($user_by_login) && is_null($user_by_email)) {
            abort(400, 'The selected login is invalid.');
        }

        $user = $user_by_login ? $user_by_login : $user_by_email->user;

        $pass = $this->preparePassword($user, $request->input('password'));

        if ($pass !== $user->hashed_password) {
            abort(400, 'Invalid credentials');
        }

        return Token::firstOrCreate([
            'user_id' => $user->id,
            'action' => 'session',
            'value' => sha1($user->hashed_password)
        ]);
    }

    public function register(Request $request): User
    {
        $salt = str_random(33);

        /**
         * Create new User
         */
        $user = User::create([
            'login' => $request->input('login'),
            'firstname' => $request->input('first_name'),
            'lastname' => $request->input('last_name'),
            'language' => $request->input('lang'),
            'salt' => $salt,
            'hashed_password' => sha1($salt . sha1($request->input('password'))),
            'mail_notification' => 'only_my_events'
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
            'hide_mail' => $request->input('hide_email', 0),
            'time_zone' => \Config::get('app.timezone')
        ]);

        /**
         * Add the default serialized data
         */
        UserPreference::updateOthers($user_reference);

        return $user;
    }

    public function sendResetPasswordToken(Request $request): Token
    {
        /**
         * @TODO SEND MESSAGE BY EMAIL
         * @TODO PROCESS SENDING MESSAGE DEVELOPMENT IN BEANSTALKD
         */

        $user = EmailAddresses::where('address', $request->input('email'))->firstOrFail()->user;

        return Token::firstOrCreate([
            'user_id' => $user->id,
            'action' => 'reset_password',
            'value' => sha1($user->hashed_password)
        ]);
    }

    public function resetPassword(Request $request): bool
    {
        $token = Token::where('value', $request->input('token'))
            ->where('action', 'reset_password')
            ->firstOrFail();

        $this->reset($token->user, $request->input('password'));

        return $token->delete();
    }
}