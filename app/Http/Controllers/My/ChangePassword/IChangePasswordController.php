<?php

namespace App\Http\Controllers\My\ChangePassword;


use Illuminate\Http\Request;

interface IChangePasswordController
{
    /**
     * Change Password
     *
     * This method creates new password the user
     * @example Request $request {
     *     "firstname": "Test",
     *     "lastname": "Dev",
     *     "login": "test",
     *     "lang": "ru",
     *     "created": "2017-06-06 10:44:00",
     *     "email": "test@mail.ua",
     *     "hide_email": "0",
     *     "time_zone": "Kyiv",
     * }
     *
     * @example response {} code 204
     *
     * @param Request $request
     * @return mixed
     */
    public function changePassword(Request $request);
}