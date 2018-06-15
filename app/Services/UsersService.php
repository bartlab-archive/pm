<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Database\Eloquent\Builder;
use Symfony\Component\Yaml\Yaml;

/**
 * Class UsersService
 *
 * @property EmailAddressesService $emailAddressesService
 * @property UserPreferenceService $preferenceService
 *
 * @package App\Services
 */
class UsersService
{
//    protected $emailAddressesService;
//    protected $preferenceService;

    public function __construct(
//        EmailAddressesService $emailAddressesService,
//        UserPreferenceService $preferenceService
    )
    {
//        $this->emailAddressesService = $emailAddressesService;
//        $this->preferenceService = $preferenceService;
    }

    public function create(array $data)
    {
        $salt = str_random(33);

        /** @var User $user */
        $user = User::make(
            array_merge(
                array_only($data, ['login', 'firstName', 'lastName', 'lang', 'only_my_events']),
                [
                    'salt' => $salt,
                    'hashed_password' => $this->preparePassword($salt, array_get($data, 'password'))
                ]
            )
        );

        if ($user->save()) {
            $user->email()->create([
                'address' => array_get($data, 'email'),
                'is_default' => array_get($data, 'is_default', 1),
                'notify' => array_get($data, 'notify', 1),
            ]);

            $user->preference()->create([
                'hide_mail' => array_get($data, 'hideEmail'),
                'time_zone' => \Config::get('app.timezone'),
                'others' => Yaml::dump(UserPreference::DEFAULT_OTHERS_DATA)
            ]);

            return $user;
        }

        return false;
    }

    public function byLoginOrEmail(string $login)
    {
        return User::query()
            ->where('login', $login)
            ->orWhereHas('email', function ($query) use ($login) {
                /** @var $query Builder */
                $query->where('address', $login);
            })
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
        if ($user = $this->byLoginOrEmail($login)) {
            return $this->preparePassword($user->salt, $password) === $user->hashed_password;
        }

        return false;
    }

    public function preparePassword(string $salt, string $password): string
    {
        return sha1($salt . sha1($password));
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