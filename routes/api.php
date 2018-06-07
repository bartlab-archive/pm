<?php

use Illuminate\Http\Request;

/*
 * todo: change Route definitions for use the callable array syntax - Route::get('smth', [SomeController::class, 'methodName']);
 */

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

        // todo: move to projects group (?)
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

        // todo: move to projects group
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

        // todo: move to issues group (?)
        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'issues_categories'
            ],
            function () {
                Route::get('/{identifier}', 'IssueCategoriesController@index');
                Route::post('/{identifier}', 'IssueCategoriesController@store');
                Route::put('/{id}', 'IssueCategoriesController@update');
                Route::delete('/{id}', 'IssueCategoriesController@destroy');
                Route::get('/{id}', 'IssueCategoriesController@show');
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

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'wikis'
            ],
            function () {
                Route::get('/{identifier}/pages', 'WikiPagesController@index');
                Route::post('/{identifier}/pages', 'WikiPagesController@store');
                Route::get('/{identifier}/pages/{name}', 'WikiPagesController@show');

                Route::put('/{identifier}/pages/{id}', 'WikiPagesController@update');
                Route::delete('/{identifier}/pages/{id}', 'WikiPagesController@destroy');

                Route::post('/{identifier}/pages/{id}/watch', 'WikiPagesController@watch');
                Route::delete('/{identifier}/pages/{id}/watch', 'WikiPagesController@unwatch');

                Route::post('/{identifier}/pages/{id}/lock', 'WikiPagesController@lock');
                Route::delete('/{identifier}/pages/{id}/unlock', 'WikiPagesController@unlock');

                Route::get('/{identifier}', 'WikisController@show');
                Route::post('/{identifier}', 'WikisController@store');
                Route::put('/{identifier}', 'WikisController@update');
                Route::delete('/{identifier}', 'WikisController@destroy');
            }
        );

//        Route::group(
//            [
//                'middleware' => 'auth',
//                'prefix' => 'wiki_pages'
//            ],
//            function () {
//                Route::get('/{$identifier}', 'WikiPagesController@index');
//                Route::post('/{$identifier}', 'WikiPagesController@store');
//                Route::get('/{$identifier}/{name}', 'WikiPagesController@show');
//                Route::put('/{id}', 'WikiPagesController@update');
//                Route::delete('/{id}', 'WikiPagesController@destroy');
//
//                Route::post('/{id}/watch', 'WikiPagesController@watch');
//                Route::delete('/{id}/watch', 'WikiPagesController@unwatch');
//
//                Route::post('/{id}/lock', 'WikiPagesController@lock');
//                Route::delete('/{id}/unlock', 'WikiPagesController@unlock');
//            }
//        );

//        Route::group(
//            [
//                'middleware' => 'auth',
//                'prefix' => 'filters'
//            ],
//            function () {
//                Route::get('/', 'IssuesController@getIssuesFilters');
//            }
//        );

//        Route::group(
//            [
//                'middleware' => 'auth',
//                'prefix' => 'news'
//            ],
//            function () {
//                Route::get('/', 'NewsController@index');
//                Route::get('/{id}', 'NewsController@show');
//                Route::put('{id}', 'NewsController@update');
//            }
//        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'issues'
            ],
            function () {
                Route::get('/', 'IssuesController@index');
                Route::post('/', 'IssuesController@store');
                Route::get('/filters', 'IssuesController@filters');
                Route::get('/{id}', 'IssuesController@show');
                Route::put('/{id}', 'IssuesController@update');
                Route::delete('/{id}', 'IssuesController@destroy');
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

        // todo: move to issues group (?)
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

Route::any('{all}', function () {
    abort(404);
})->where('all', '.*');