<?php

namespace App\Http\Controllers;


use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordSendTokenRequest;
use App\Interfaces\IAuthService;

class AuthController extends Controller
{
    /**
     * @var IAuthService
     */
    protected $authService;

    public function __construct(IAuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Authorization user in system
     *
     * @url protocol://ip:port/api/v1/auth
     *
     * @example {
     *     "login": "user email" or "login",
     *     "password": "user password"
     * }
     *
     * @param AuthLoginRequest $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function login(AuthLoginRequest $request)
    {
        $token = $this->authService->login($request);

        return response()->json(['token' => $token->value]);
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
     * @param AuthRegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(AuthRegisterRequest $request)
    {
        $this->authService->register($request);

        return response(null, 201);
    }

    public function sendResetPasswordToken(ResetPasswordSendTokenRequest $request)
    {
        /**
         * @TODO SEND MESSAGE BY EMAIL
         * @TODO PROCESS SENDING MESSAGE DEVELOPMENT IN BEANSTALKD
         */

        $token = $this->authService->sendResetPasswordToken($request);

        return response()->json(['reset_password_token' => $token->value]);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $this->authService->resetPassword($request);

        return response(null, 202);
    }
}