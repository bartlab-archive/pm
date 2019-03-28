<?php
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
        Route::group(
            [
                'middleware' => ['auth', 'throttle:1000,1'],
                'prefix' => 'attachments'
            ],
            function () {
                Route::get('{id}', 'AttachmentsController@download');
//                Route::get('/{identifier}', 'ProjectsController@show');
                Route::post('', 'AttachmentsController@upload');
                Route::put('{id}', 'AttachmentsController@update');
                Route::delete('{id}', 'AttachmentsController@delete');
//                Route::put('/{identifier}', 'ProjectsController@update');

            }
        );

        Route::group(
            [
                'prefix' => 'auth'
            ],
            function () {
                Route::get('', 'AuthController@me');
                Route::post('login', 'AuthController@login');
                Route::post('register', 'AuthController@register');
                Route::post('reset', 'AuthController@lostPassword');
//                Route::post('password-reset', 'AuthController@sendResetPasswordToken');
//                Route::put('password-reset', 'AuthController@resetPassword');
            }
        );

//        Route::group(
//            [
//                'middleware' => 'auth',
//                'prefix' => 'custom_fields'
//            ],
//            function () {
//                Route::get('/', 'CustomFieldsController@getList');
//                Route::get('/{id}', 'CustomFieldsController@one');
//                Route::put('/{id}', 'CustomFieldsController@update');
//                Route::post('/', 'CustomFieldsController@create');
//                Route::delete('/{id}', 'CustomFieldsController@destroy');
//            }
//        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'enumerations'
            ],
            function () {
                Route::get('', 'EnumerationsController@index');
            }
        );

//        Route::group(
//            [
//                'middleware' => 'auth',
//                'prefix' => 'groups'
//            ],
//            function () {
//                Route::get('', 'GroupsController@getList');
//                Route::post('', 'GroupsController@create');
//                Route::delete('{id}', 'GroupsController@destroy');
//                Route::get('{id}', 'GroupsController@one');
//                Route::put('{id}', 'GroupsController@update');
//            }
//        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'issues'
            ],
            function () {
                // issues
                Route::get('', 'IssuesController@index');
                Route::post('', 'IssuesController@store');
                Route::get('{id}', 'IssuesController@show');
                Route::put('{id}', 'IssuesController@update');
                Route::delete('{id}', 'IssuesController@destroy');
                Route::post('{id}/watch', 'IssuesController@watch');
                Route::delete('{id}/watch', 'IssuesController@unwatch');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'statuses'
            ],
            function () {
                Route::get('', 'IssueStatusesController@index');
                Route::post('', 'IssueStatusesController@store')->middleware('admin');
                Route::get('{id}', 'IssueStatusesController@show');
                Route::put('{id}', 'IssueStatusesController@update')->middleware('admin');
                Route::delete('{id}', 'IssueStatusesController@destroy')->middleware('admin');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'trackers'
            ],
            function () {
                Route::get('', 'TrackersController@index');
                Route::post('', 'TrackersController@store')->middleware('admin');
                Route::get('{id}', 'TrackersController@show');
                Route::put('{id}', 'TrackersController@update')->middleware('admin');
                Route::delete('{id}', 'TrackersController@destroy')->middleware('admin');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'categories'
            ],
            function () {
                Route::get('{id}', 'IssueCategoriesController@show');
                Route::put('{id}', 'IssueCategoriesController@update');
                Route::delete('{id}', 'IssueCategoriesController@destroy');
            }
        );

        // todo: move to projects group (?)
        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'members'
            ],
            function () {
                Route::put('{id}', 'MembersController@update');
                Route::delete('{id}', 'MembersController@destroy');
            }
        );

        // todo: move to projects group (?)
        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'modules'
            ],
            function () {
                // todo: check and remove if not use
                Route::get('/', 'EnabledModulesController@index');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'account'
            ],
            function () {
                Route::get('', 'AccountController@show');
                Route::put('', 'AccountController@update');

                Route::post('token', 'AccountController@token');
                Route::post('password', 'AccountController@password');

                Route::post('email', 'AccountController@createEmail');
                Route::put('email', 'AccountController@updateEmailNotify');
                Route::delete('email/{address}', 'AccountController@destroyEmail');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'projects'
            ],
            function () {
                Route::get('', 'ProjectsController@index');
                Route::post('', 'ProjectsController@store');
                Route::get('{identifier}', 'ProjectsController@show');
                Route::put('{identifier}', 'ProjectsController@update');

                // todo: wrap routes in group by {identifier}?

                // issues
                Route::get('{identifier}/issues', 'IssuesController@index');

                // issues categories
                Route::get('{identifier}/categories', 'IssueCategoriesController@index');
                Route::post('{identifier}/categories', 'IssueCategoriesController@store');

                // trackers
                Route::get('{identifier}/trackers', 'ProjectTrackersController@index');
                Route::put('{identifier}/trackers', 'ProjectTrackersController@update');

                // members
                Route::post('{identifier}/members', 'MembersController@store');

                // modules
                Route::put('{identifier}/modules', 'EnabledModulesController@update');

                // wikis
                Route::get('{identifier}/wikis', 'WikisController@show');
                Route::post('{identifier}/wikis', 'WikisController@store');
                Route::put('{identifier}/wikis', 'WikisController@update');
                Route::delete('{identifier}/wikis', 'WikisController@destroy');

                // wiki pages
                Route::get('{identifier}/wikis/pages', 'WikiPagesController@index');
                Route::post('{identifier}/wikis/pages', 'WikiPagesController@store');
                Route::get('{identifier}/wikis/pages/{name}', 'WikiPagesController@show');
                Route::put('{identifier}/wikis/pages/{id}', 'WikiPagesController@update');
                Route::delete('{identifier}/wikis/pages/{id}', 'WikiPagesController@destroy');
                Route::post('{identifier}/wikis/pages/{id}/watch', 'WikiPagesController@watch');
                Route::delete('{identifier}/wikis/pages/{id}/watch', 'WikiPagesController@unwatch');
                Route::post('{identifier}/wikis/pages/{id}/lock', 'WikiPagesController@lock');
                Route::delete('{identifier}/wikis/pages/{id}/unlock', 'WikiPagesController@unlock');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'roles'
            ],
            function () {
                Route::get('', 'RolesController@index');
            }
        );

        Route::group(
            [
//                'middleware' => 'auth',
                'prefix' => 'settings'
            ],
            function () {
                Route::get('', 'SettingsController@index');
                Route::get('{name}', 'SettingsController@show');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'users'
            ],
            function () {
                Route::get('', 'UsersController@index');
                Route::post('', 'UsersController@store')->middleware('admin');
                Route::get('{id}', 'UsersController@show');
                Route::put('{id}', 'UsersController@update')->middleware('admin');
                Route::delete('{id}', 'UsersController@destroy')->middleware('admin');
            }
        );

//        Route::group(
//            [
//                'middleware' => 'auth',
//                'prefix' => 'wikis'
//            ],
//            function () {
//                // wikis
//                Route::get('/{identifier}', 'WikisController@show');
//                Route::post('/{identifier}', 'WikisController@store');
//                Route::put('/{identifier}', 'WikisController@update');
//                Route::delete('/{identifier}', 'WikisController@destroy');
//
//                // pages
//                Route::get('/{identifier}/pages', 'WikiPagesController@index');
//                Route::post('/{identifier}/pages', 'WikiPagesController@store');
//                Route::get('/{identifier}/pages/{name}', 'WikiPagesController@show');
//                Route::put('/{identifier}/pages/{id}', 'WikiPagesController@update');
//                Route::delete('/{identifier}/pages/{id}', 'WikiPagesController@destroy');
//                Route::post('/{identifier}/pages/{id}/watch', 'WikiPagesController@watch');
//                Route::delete('/{identifier}/pages/{id}/watch', 'WikiPagesController@unwatch');
//                Route::post('/{identifier}/pages/{id}/lock', 'WikiPagesController@lock');
//                Route::delete('/{identifier}/pages/{id}/unlock', 'WikiPagesController@unlock');
//            }
//        );
    }
);

Route::any('{all}', function () {
    abort(404);
})->where('all', '.*');
