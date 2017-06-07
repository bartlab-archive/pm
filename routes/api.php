<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::group(
    [
        'prefix' => 'v1',
//        'middleware' => 'auth'
    ],
    function () {
        Route::group(
            [
                'namespace' => 'Auth'
            ],
            function ()
            {
                Route::post('auth', 'LoginController@login');
                Route::post('register', 'RegisterController@register');
                Route::get('password-reset', 'ResetPasswordController@sendToken');
                Route::post('password-reset', 'ResetPasswordController@reset');
            }
        );

        Route::group(
            [
                'prefix' => 'my',
                'namespace' => 'My',
                'middleware' => 'auth'
            ],
            function ()
            {
                Route::get('account', 'Account\AccountController@show');
                Route::put('account', 'Account\AccountController@update');
                Route::put('password', 'ChangePassword\ChangePasswordController@changePassword');

                Route::get('api-key', 'Keys\KeysController@showApiKey');
                Route::put('api-key', 'Keys\KeysController@resetApiKey');
                Route::put('rss-key', 'Keys\KeysController@resetAtomKey');
            }
        );

        // projects

        Route::get('projects', function (Request $request) {
            $list = \App\Models\Project::orderBy('name')->where('status', 1);
            if ($request->input('closed')) {
                $list->orWhere('status', 5);
            }
            return $list->get();
        });

        Route::get('projects/{identifier}', function ($identifier) {
            return \App\Models\Project::where('identifier', $identifier)->first();
        });

        // users

        Route::get('users', function (Request $request) {
            return \App\Models\User::orderBy('login')->get();
        });

        Route::get('users/{id}', function ($identifier) {
            return \App\Models\User::where('id', $identifier)->first();
        });
//        Route::post('auth', 'Auth\LoginController@login');
//        Route::post('register', 'Auth\RegisterController@register');
//        Route::post('reset', 'Auth\ForgotPasswordController@resetVerify');
//        Route::post('reset-confirmed', 'Auth\ResetPasswordController@resetConfirmed');
//
//        Route::group(['middleware' => 'jwt.auth'], function() {
//            Route::post('test', function (Request $request) {
//                return json_encode($request->toArray());
//            });
//            Route::get('test', function (Request $request) {
//                return json_encode($request->toArray());
//            });
//            Route::get('401', function (Request $request) {
//                return response(json_encode([]), 401);
//            });
//            Route::get('403', function (Request $request) {
//                return response(json_encode([]), 403);
//            });
//            Route::get('500', function (Request $request) {
//                return response(json_encode([]), 500);
//            });
//            Route::resource('users', 'UserController', ['only' => ['index', 'store']]);
//        });
    }
);