<?php

namespace App\Services;

use App\Models\EmailAddress;
use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class UsersService
 *
 * @package App\Services
 */
class UsersService
{
//    protected $emailAddressesService;
//    protected $preferenceService;
    protected $tokenService;

    public function __construct(
        TokenService $tokenService
//        EmailAddressesService $emailAddressesService,
//        UserPreferenceService $preferenceService
    )
    {
        $this->tokenService = $tokenService;
//        $this->emailAddressesService = $emailAddressesService;
//        $this->preferenceService = $preferenceService;
    }

    public function create(array $data)
    {
        $salt = str_random(33);

        /** @var User $user */
        $user = User::make(
            array_merge(
                array_only($data, ['login', 'firstName', 'lastName', 'language']),
//                array_only($data, ['login', 'firstName', 'lastName', 'lang', 'only_my_events']),
                [
                    // todo: move to const
                    'type' => 'User',
                    // todo: get from $data
                    'mail_notification' => 'only_my_events',
                    // todo: get from $data
                    'admin' => 0,
                    // todo: get from settings or $data
                    'status' => User::STATUS_DISABLE,
                    // todo: get from settings or $data
                    'must_change_passwd' => 0,
                    'salt' => $salt,
                    'hashed_password' => $this->preparePassword($salt, array_get($data, 'password'))
                ]
            )
        );

        if ($user->save()) {
            // user default email
            $user->emails()->create([
                'address' => array_get($data, 'email'),
                'is_default' => true,
                'notify' => true,
            ]);

            // user preference
            $user->preference()->create([
                // todo: get from settings if not set
                'hide_mail' => array_get($data, 'hideEmail'),
                // todo: get from $data or app settings
                'time_zone' => \Config::get('app.timezone'),
                'others' => UserPreference::DEFAULT_OTHERS_DATA
            ]);

            // create ati and feeds token
            $this->tokenService->create($user->id, 'api');
            $this->tokenService->create($user->id, 'feeds');

            return $user;
        }

        return false;
    }

    public function update($id, array $data)
    {
        /** @var User $user */
        if (!$user = $this->one($id)) {
            return false;
        }

        if (!$user->update(array_only($data, ['firstname', 'lastname', 'language', 'mail_notification']))) {
            return false;
        }

        // update default email
        if ($emailAddress = array_get($data, 'email')) {
            // todo: remove "restore" tokens, if email changed

            if (!$email = $user->emails()->where(['is_default' => true])->first()) {
                $email = $user->emails()->make(['is_default' => true, 'notify' => true]);
            }

            if (!$email->fill(['address' => $emailAddress])->save()) {
                return false;
            }
        }

        if (!$this->updatePreference(
            $id,
            array_only($data, ['comments_sorting', 'no_self_notified', 'warn_on_leaving_unsaved']),
            array_get($data, 'hide_mail', true),
            array_get($data, 'time_zone', '')
        )) {
            return false;
        }

        return $user;
    }

    public function updatePreference($userId, array $data = [], bool $hideMail = null, string $timeZone = null)
    {
        /** @var User $user */
        if (!$user = $this->one($userId)) {
            return false;
        }

        // create preference if not exists
        if (!$preference = $user->preference) {
            $preference = $user->preference()->make([
                'others' => UserPreference::DEFAULT_OTHERS_DATA,
                'hide_mail' => $hideMail ?? true,
                'time_zone' => $timeZone ?? ''
            ]);
        }

        $others = $preference->others;
        foreach ($data as $key => $value) {
            if ($value !== null) {
                if (\is_bool($value)) {
                    $value = $value ? '1' : '0';
                }
                $others[$key] = $value;
            }
        }

        return $preference
            ->fill(array_merge(
                ['others' => $others],
                ($hideMail !== null ? ['hide_mail' => $hideMail] : []),
                ($timeZone !== null ? ['time_zone' => $timeZone] : [])
            ))
            ->save();
    }

    public function byLogin(string $login)
    {
        return User::query()
            ->where('login', $login)
//            ->orWhereHas('email', function ($query) use ($login) {
            /** @var $query Builder */
//                $query->where('address', $login);
//            })
            ->first();
    }

//    public function userByToken(string $token, string $action)
//    {
//        return User::query()
//            ->whereHas('tokens', function ($query) use ($token, $action) {
//                /** @var $query Builder */
//                $query->where('action', $action)->where('value', $token);
//            })
//            ->first();
//    }

    public function validatePassword(string $login, string $password): bool
    {
        if ($user = $this->byLogin($login)) {
            return $this->preparePassword($user->salt, $password) === $user->hashed_password;
        }

        return false;
    }

    public function preparePassword(string $salt, string $password): string
    {
        return sha1($salt . sha1($password));
    }

    public function changePassword($userId, $password)
    {
        /** @var User $user */
        if (!$user = $this->one($userId)) {
            return false;
        }

        if (!$user->fill(['hashed_password' => $this->preparePassword($user->salt, $password)])->save()) {
            return false;
        }

        return true;
    }

    public function createEmail(int $userId, string $address, bool $isDefault = false, bool $notify = true)
    {
        /** @var User $user */
        if (!$user = $this->one($userId)) {
            return false;
        }

        /** @var EmailAddress $email */
        $email = $user->emails()->make([
            'address' => $address,
            'is_default' => $isDefault,
            'notify' => $notify
        ]);

        if (!$email->save()) {
            return false;
        }

        return $email;
    }

    public function oneEmailAddress(string $address)
    {
        return EmailAddress::query()
            ->where(['address' => $address])
            ->first();
    }

    public function updateEmailNotify(string $address, bool $notify)
    {
        if (!$email = $this->oneEmailAddress($address)) {
            return false;
        }

        if (!$email->fill(['notify' => $notify])->save()) {
            return false;
        }

        return $email;
    }

    public function removeEmail(string $address)
    {
        if (!$email = $this->oneEmailAddress($address)) {
            return false;
        }

        try {
            return $email->delete();
        } catch (\Exception $exception) {
            return false;
        }
    }

//    public function resetPassword(User $user, $new_password): bool
//    {
//        $user->hashed_password = $this->preparePassword($user, $new_password);
//
//        return $user->save();
//    }

    /**
     * Get users list
     *
     * @param array $params
     * @return mixed
     */
//    public function all($params = [])
//    {
//        $users = User::query()
//            ->orderBy('firstname')
//            ->where('firstname', '!=', '');
//
////        if (isset($params['ids'])) {
////            $users = $users->whereIn('id', $params['ids']);
////            unset($params['ids']);
////        }
////
////        !empty($params) ? $users = $users->where($params) : null;
//
//        return $users->get();
//    }

    /**
     * @param $id
     * @param array $with
     * @return mixed
     */
//    public function getById($id, $with = [])
//    {
//        return User::where('id', $id)->with($with)
//            ->with([
////                'members' => function ($query) {
////                    $query->with(['user', 'member_roles.roles']);
////                },
////                'issues',
//                'projects', 'preference'
//            ])
//            ->first();
//    }

    public function one($id, array $with = [])
    {
        return User::query()
            ->with($with)
            ->where(['id' => $id])
            ->first();
    }

//    public function update($id, $data)
//    {
//        if (isset($data['email'])) {
//            $mainEmail = $this->emailAddressesService->getList(['user_id' => $id, 'is_default' => true])->first();
//            $this->emailAddressesService->update($mainEmail, ['address' => $data['email']]);
//            unset($data['email']);
//        }
//
//        $userPreferencesData = [];
//        $userPreferencesFields = [
//            'comments_sorting',
//            'no_self_notified',
//            'warn_on_leaving_unsaved',
//            'time_zone',
//            'hide_mail'
//        ];
//
//        foreach ($userPreferencesFields as $field) {
//            if (isset($data[$field])) {
//                $userPreferencesData[$field] = $data[$field];
//                unset($data[$field]);
//            }
//        }
//        unset($userPreferencesFields);
//
//        if (!empty($userPreferencesData)) {
//            $this->preferenceService->updateByUserId($id, $userPreferencesData);
//        }
//
//        unset($data['id']);
//
//        return User::where(['id' => $id])->first()->update($data);
//    }
//
//    public function changePassword(array $data)
//    {
//        $user = Auth::user();
//        $this->resetPassword($user, $data['new_password']);
//
//        return $user->update(['passwd_changed_on' => date('Y-m-d H:i:s')]);
//    }
//
//    public function delete($id)
//    {
//        $user = User::where('id', $id)->firstOrFail();
//
//        return $user->delete();
//    }
}