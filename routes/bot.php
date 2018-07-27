<?php

/*
|--------------------------------------------------------------------------
| Bot Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for external bots, like telegram or facebook.
|
*/
Route::group(
    [
        'prefix' => 'issues'
    ],
    function () {
        Route::get('/{id}', 'IssuesBotController@show');
    }
);

Route::any('{all}', function () {
    return view('bot');
})->where('all', '.*');