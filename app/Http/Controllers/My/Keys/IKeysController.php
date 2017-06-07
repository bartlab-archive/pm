<?php

namespace App\Http\Controllers\My\Keys;

use Illuminate\Http\Request;

/**
 * Interface IKeysController
 *
 * @package App\Http\Controllers\My\Keys
 */
interface IKeysController
{
    /**
     * Show api key
     *
     * This method returns the api key by user
     *
     * @param Request $request
     * @return mixed
     */
    public function showApiKey(Request $request);

    /**
     * Reset api key
     *
     * This method resets the api key by user
     *
     * @param Request $request
     * @return mixed
     */
    public function resetApiKey(Request $request);

    /**
     * Reset api key
     *
     * This method resets the atom key by user
     *
     * @param Request $request
     * @return mixed
     */
    public function resetAtomKey(Request $request);
}