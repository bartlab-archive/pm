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
//                'namespace' => 'Auth'
            ],
            function ()
            {
                Route::post('auth', 'AuthController@login');
                Route::post('register', 'AuthController@register');
                Route::post('password-reset', 'AuthController@sendResetPasswordToken');
                Route::put('password-reset', 'AuthController@resetPassword');
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
                'middleware' => 'auth',
	            'prefix' => 'projects'
	            
            ],
            function ()
            {
	            Route::get('/', 'ProjectsController@index');
	            Route::get('/{identifier}', 'ProjectsController@show');
	            Route::post('/', 'ProjectsController@create');
	            Route::put('/{identifier}', 'ProjectsController@update');
	            Route::delete('/{identifier}', 'ProjectsController@destroy');
	            Route::get('/{identifier}/issues', 'ProjectsController@getIssues');
	            
	            Route::get('/{identifier}/news', 'WikiController@getNews');
	            Route::put('/{identifier}/wiki/{id}', 'WikiController@setWikiPageMarkDown');
	            Route::get('/{identifier}/wiki', 'WikiController@getWikiPageMarkDown');
	            Route::get('/{identifier}/wiki/all', 'WikiController@getAllWikiPage');
	            Route::post('/{identifier}/new-page', 'WikiController@addNewWiki');
	            Route::get('/{identifier}/wiki/{page_title}', 'WikiController@getWikiPageMarkDown');
	            Route::put('/{identifier}/wiki/{name}/{id}', 'WikiController@setWikiPageMarkDown');
	            
                Route::get('/{projectId}/attachments', 'AttachmentController@index');
	            
        });
        
	    Route::group(
		    [
			    'middleware' => 'auth',
			    'prefix' => 'news'
		
		    ],
		    function () {
			    Route::get('/', 'NewsController@getNews');
			    Route::get('/{id}', 'NewsController@getOneNews');
		    });
	
	    Route::group(
		    [
			    'middleware' => 'auth',
			    'prefix' => 'issues'
		
		    ],
		    function () {
			    Route::get('/{id}', 'IssuesController@getIssue');
			    Route::get('/', 'IssuesController@getIssues');
			    Route::post('/{id}/update', 'IssuesController@postUpdate');
			    Route::get('/{id}/infoedit/{project_id}', 'IssuesController@infoEdit');
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