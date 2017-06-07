<?php

namespace App\Http\Controllers\My\Keys;

use App\Http\Controllers\Controller;
use App\Models\Token;
use App\Models\User;
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

        return response()->json($this->buildResponse($user_api_key));
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
            Token::createApiKey($user);

            return response(null, 204);
        }

        $user_api_key->update(['value' => sha1(str_random(33))]);

        return response(null, 204);
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
            Token::createAtomKey($user);

            return response(null, 204);
        }

        $user_atom_key->update(['value' => sha1(str_random(33))]);

        return response(null, 204);
    }

    /**
     * Build response
     *
     * This method returns the key data
     *
     * @param Token $model
     * @return array
     */
    protected function buildResponse(Token $model)
    {
        return [
            'api_key' => $model->value,
            'updated_on' => date($model->updated_on)
        ];
    }
}