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

/**
 * Route group
 *
 * This route group contains the routes api version 1
 */
Route::group(
    [
        'prefix' => 'v1'
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
                Route::post('password-reset', 'ResetPasswordController@sendToken');
                Route::put('password-reset', 'ResetPasswordController@reset');
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

        Route::group(
            [
                'middleware' => ['auth']
            ],
            function ()
            {
                Route::get('projects', 'ProjectController@index');
                Route::get('projects/{identifier}', 'ProjectController@show');
                Route::get('projects/{identifier}/wiki', 'WikiController@getWikiPageMarkDown');
                Route::get('projects/{identifier}/wiki/all', 'WikiController@getAllWikiPage');
                Route::get('projects/{identifier}/wiki/{page_title}', 'WikiController@getWikiPageMarkDown');
                Route::delete('projects/{identifier}', 'ProjectController@destroy');
                Route::put('projects/{identifier}/wiki/{id}', 'WikiController@setWikiPageMarkDown');
                Route::put('projects/{identifier}/wiki/{name}/{id}', 'WikiController@setWikiPageMarkDown');
                Route::post('projects/{identifier}/new-page', 'WikiController@addNewWiki');
            }
        );

        Route::get('projects/{identifier}/issues', 'ProjectsController@getIssues');
        Route::group(
            [
//                'middleware' => ['auth']
            ],
            function ()
            {
                Route::get('projects', 'ProjectController@index');
                Route::get('projects/{identifier}', 'ProjectController@show');
                Route::get('projects/{identifier}/news', 'WikiController@getNews');
                Route::post('projects', 'ProjectController@create');
                Route::put('projects/{identifier}', 'ProjectController@update');
                Route::delete('projects/{identifier}', 'ProjectController@destroy');
                Route::get('projects/{identifier}/issues', 'ProjectController@getIssues');
                Route::get('projects/{projectId}/attachments', 'Projects\AttachmentController@index');
        });
		
        Route::get('news', 'NewsController@getNews');
        Route::get('news/{id}', 'NewsController@getOneNews');
        
        
        Route::get('issues/{id}', 'IssuesController@getIssue');
        Route::get('issues', 'IssuesController@getIssues');
        Route::post('issues/{id}/update', 'IssuesController@postUpdate');
        Route::get('issues/{id}/infoedit/{project_id}', 'IssuesController@infoEdit');

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