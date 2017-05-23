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
        Route::post('auth',function(){
            return [];
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