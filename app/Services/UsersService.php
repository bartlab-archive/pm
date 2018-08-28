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
                array_only($data, ['login', 'firstname', 'lastname', 'language', 'mail_notification', 'admin', 'status']),
//                array_only($data, ['login', 'firstName', 'lastName', 'lang', 'only_my_events']),
                [
                    'type' => User::TYPE_USER,
                    // todo: get from $data
//                    'mail_notification' => 'only_my_events',
                    // todo: get from $data
//                    'admin' => 0,
                    // todo: get from settings or $data
//                    'status' => User::STATUS_DISABLE,
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
                'hide_mail' => array_get($data, 'hide_email'),
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

//        if (!$user->update(array_only($data, ['firstname', 'lastname', 'language', 'mail_notification']))) {
        if (!$user->update(array_only($data, ['login', 'firstname', 'lastname', 'language', 'mail_notification', 'admin']))) {
            return false;
        }

        // if get new password
        if (($password = array_get($data, 'password')) && !$this->changePassword($id, $password)) {
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

        // update preference
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
                // convert boolean to int and string
                $others[$key] = \is_bool($value) ? (string)+$value : $value;
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

    public function all(array $params = [], array $with = [])
    {
        $query = User::query()
            ->with($with)
            ->where('type', '<>', User::TYPE_ANONYMOUS_USER);
//            ->orderBy('type')
        // todo: order by app settings for display user name
//            ->orderBy('firstname')
//            ->orderBy('lastname');

        // if status not set, add STATUS_ACTIVE to where
        if ($status = array_get($params, 'status')) {
//        if ($status = array_get($params, 'status', [User::STATUS_ACTIVE])) {
            $query->whereIn('status', $status);
        }

        // by default return only 'User'. if type set to 'all', return full table
        if (($type = array_get($params, 'type', User::TYPE_USER)) && $type !== 'all') {
            $query->where(['type' => $type]);
        }

        if ($group_id = array_get($params, 'group_id')) {
            $query->whereHas('groups', function ($query) use ($group_id) {
                $query->where(['id' => $group_id]);
            });
        }

        // todo: order by app settings for display user name
        if ($order = array_get($params, 'order', ['type' => 'asc', 'firstname' => 'asc', 'lastname' => 'asc'])) {
            if (\is_string($order) && \count($split = explode(':', $order)) === 2) {
                $order = [$split[0] => $split[1]];
            }

            // todo: add check, if column available
            foreach ($order as $key => $val) {
                $query->orderBy($key, $val);
            }
        }

        if ($perPage = array_get($params, 'per_page')) {
            return $query->paginate($perPage);
        }

        // todo: add order by

        return $query->get();
    }

    public function one($id, array $with = [])
    {
        return User::query()
            ->with($with)
            ->where(['id' => $id, 'type' => User::TYPE_USER])
            ->first();
    }

    public function groupAnonymous()
    {
        return User::query()
            ->where(['type' => User::TYPE_GROUP_ANONYMOUS])
            ->first();
    }

    public function groupNonMember()
    {
        return User::query()
            ->where(['type' => User::TYPE_GROUP_NON_MEMBER])
            ->first();
    }

    public function groupBots()
    {
        // todo: get data for this group from app config
        return User::query()
            // lagacy redmine support
            ->where(['lastname' => User::TYPE_GROUP_BOTS])
            ->where(['type' => User::TYPE_GROUP])
//            ->where(['type' => User::TYPE_GROUP_BOTS])
            ->first();
    }

    public function memberIds($id = null, bool $noMember = true)
    {
        $userIds = [];

        // todo: wrong access logic

        if ($id === null) {
            // check for Anonymous user
            if ($groupAnonymous = $this->groupAnonymous()) {
                $userIds[] = $groupAnonymous->id;
            }
        } else {
            if ($user = $this->one($id)) {
                $nonMemberGroup = $noMember ? $this->groupNonMember() : null;

                $userIds = array_merge(
                    $userIds,
                    [$id],
                    array_column($user->groups->toArray(), 'id'),
                    $nonMemberGroup ? [$nonMemberGroup->id] : []
                );
            }
        }

        return $userIds;
    }
}