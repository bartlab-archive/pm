<?php

namespace App\Http\Controllers\My\Keys;

use App\Http\Controllers\Controller;
use App\Models\Token;
use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Http\Request;

/**
 * Class KeysController
 * @package App\Http\Controllers\My\Keys
 */
class KeysController extends Controller implements IKeysController
{
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