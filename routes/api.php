<?php

use Illuminate\Http\Request;

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
        Route::group([],
            function () {
                Route::post('auth', 'AuthController@login');
                Route::post('register', 'AuthController@register');
                Route::post('password-reset', 'AuthController@sendResetPasswordToken');
                Route::put('password-reset', 'AuthController@resetPassword');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'my'
            ],
            function () {
                Route::get('account', 'AccountController@show');
                Route::put('account/{id}', 'AccountController@update');
                Route::put('password', 'AccountController@changePassword');
//                Route::get('api-key', 'AccountController@showApiKey');
                Route::put('api-key', 'AccountController@resetApiKey');
                Route::put('rss-key', 'AccountController@resetAtomKey');
                Route::put('change-password', 'AccountController@resetAtomKey');
                Route::post('email-addresses', 'AccountController@addAdditionalEmails');
                Route::put('email-addresses/{id}', 'AccountController@updateAdditionalEmail');
                Route::delete('email-addresses/{id}', 'AccountController@deleteAdditionalEmail');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'projects'
            ],
            function () {
                Route::get('/', 'ProjectsController@index');
                Route::get('/{identifier}', 'ProjectsController@show');
                Route::post('/', 'ProjectsController@store');
                Route::put('/{identifier}', 'ProjectsController@update');

//                Route::delete('/{identifier}', 'ProjectsController@destroy');

//                Route::get('/{identifier}/modules', 'EnabledModulesController@index');
//                Route::put('/{identifier}/information', 'ProjectsController@updateProjectInformation');
//                Route::put('/{identifier}/updatestatus', 'ProjectsController@updateProjectStatus');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'modules'
            ],
            function () {
                Route::get('/', 'EnabledModulesController@index');
                Route::put('/{identifier}', 'EnabledModulesController@update');
//                Route::get('/{identifier}', 'EnabledModulesController@show');
//                Route::post('/', 'ProjectsController@store');
//                Route::get('/{identifier}', 'EnabledModulesController@show');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'members'
            ],
            function () {
                Route::post('/', 'MembersController@store');
                Route::put('/{id}', 'MembersController@update');
                Route::delete('/{id}', 'MembersController@destroy');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'trackers'
            ],
            function () {
                Route::get('/', 'TrackersController@getAll');
            }
        );

//        Route::group(
//            [
//                'middleware' => 'auth',
//                'prefix' => 'watchers'
//            ],
//            function () {
//                Route::post('/{type}/{id}', 'WatchersController@create');
//                Route::delete('/{type}/{id}', 'WatchersController@delete');
//            }
//        );

        Route::group(
            [
                //'middleware' => 'auth',
                'prefix' => 'agile'
            ],
            function () {
                Route::get('/', 'AgileController@getList');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'enumerations'
            ],
            function () {
                Route::get('/', 'EnumerationsController@index');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'roles'
            ],
            function () {
                Route::get('/', 'RolesController@index');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'issues_categories'
            ],
            function () {
                Route::get('/{identifier}', 'IssueCategoriesController@index');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'statuses'
            ],
            function () {
                Route::get('/', 'StatusesController@index');
            }
        );

//        Route::group(
//            [
//                'middleware' => 'auth',
//                'prefix' => 'filters'
//            ],
//            function () {
//                Route::get('/', 'IssuesController@getIssuesFilters');
//            }
//        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'news'
            ],
            function () {
                Route::get('/', 'NewsController@index');
                Route::get('/{id}', 'NewsController@show');
                Route::put('{id}', 'NewsController@update');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'issues'
            ],
            function () {
                // todo: no valid resources (actions) name?
                Route::get('/', 'IssuesController@index');
                Route::post('/', 'IssuesController@create');
                Route::get('/filters', 'IssuesController@filters');
                Route::get('/{id}', 'IssuesController@show');
                Route::put('/{id}', 'IssuesController@update');
                Route::delete('/{id}', 'IssuesController@delete');
//                Route::get('/{id}/history', 'IssuesController@history');
                Route::post('/{id}/watch', 'IssuesController@watch');
                Route::delete('/{id}/watch', 'IssuesController@unwatch');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'users'
            ],
            function () {
                Route::get('/', 'UsersController@index');

                Route::get('/{id}', 'UsersController@getUser');
                Route::put('/{id}/updatestatus', 'UsersController@updateUserStatus');
                Route::put('/{id}', 'UsersController@update');
                Route::delete('/{id}', 'UsersController@destroy');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'groups'
            ],
            function () {
                Route::get('/', 'GroupsController@getList');
                Route::post('/', 'GroupsController@create');
                Route::delete('/{id}', 'GroupsController@destroy');
                Route::get('/{id}', 'GroupsController@one');
                Route::put('/{id}', 'GroupsController@update');
            }
        );

        // todo: move to issues group
        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'issue_statuses'
            ],
            function () {
                Route::get('/', 'IssueStatuseController@getList');
                Route::get('/{id}', 'IssueStatuseController@one');
                Route::put('/{id}', 'IssueStatuseController@update');
                Route::post('/', 'IssueStatuseController@create');
                Route::delete('/{id}', 'IssueStatuseController@destroy');

            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'custom_fields'
            ],
            function () {
                Route::get('/', 'CustomFieldsController@getList');
                Route::get('/{id}', 'CustomFieldsController@one');
                Route::put('/{id}', 'CustomFieldsController@update');
                Route::post('/', 'CustomFieldsController@create');
                Route::delete('/{id}', 'CustomFieldsController@destroy');

            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'settings'
            ],
            function () {
                Route::get('/', 'SettingsController@getList');

            }
        );
    }
);