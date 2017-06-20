<?php

namespace App\Http\Controllers\My\Account;


use Illuminate\Http\Request;

/**
 * Interface IAccountController
 *
 * @package App\Http\Controllers\My\Account
 */
interface IAccountController
{
    /**
     *  Show
     *
     * This method passes the user info
     *
     * @example response {
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
     * @param Request $request
     * @return mixed
     */
    public function show(Request $request);

    /**
     * Update
     *
     * This method updates the user info
     *
     * @example request {
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
     * @param Request $request
     * @return mixed
     */
    public function update(Request $request);
}