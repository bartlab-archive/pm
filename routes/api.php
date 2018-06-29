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
                'prefix' => 'auth'
            ],
            function () {
                Route::post('login', 'AuthController@login');
                Route::post('register', 'AuthController@register');
                Route::get('me', 'AuthController@me');
//                Route::post('password-reset', 'AuthController@sendResetPasswordToken');
//                Route::put('password-reset', 'AuthController@resetPassword');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'my'
            ],
            function () {
                Route::get('account', 'AccountController@show');
                Route::put('account', 'AccountController@update');

                Route::post('token', 'AccountController@token');
                Route::post('password', 'AccountController@password');

                Route::post('email', 'AccountController@createEmail');
                Route::put('email', 'AccountController@updateEmailNotify');
                Route::delete('email/{address}', 'AccountController@destroyEmail');
            }
        );

        Route::group(
            [
                'middleware' => ['auth', 'throttle:1000,1'],
                'prefix' => 'attachments'
            ],
            function () {
                Route::get('download/{id}', 'AttachmentsController@download');
//                Route::get('/{identifier}', 'ProjectsController@show');
                Route::post('/', 'AttachmentsController@upload');
                Route::put('/{id}', 'AttachmentsController@update');
                Route::delete('/{id}', 'AttachmentsController@delete');
//                Route::put('/{identifier}', 'ProjectsController@update');

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
                // wikis
                Route::get('/{identifier}', 'WikisController@show');
                Route::post('/{identifier}', 'WikisController@store');
                Route::put('/{identifier}', 'WikisController@update');
                Route::delete('/{identifier}', 'WikisController@destroy');

                // pages
                Route::get('/{identifier}/pages', 'WikiPagesController@index');
                Route::post('/{identifier}/pages', 'WikiPagesController@store');
                Route::get('/{identifier}/pages/{name}', 'WikiPagesController@show');
                Route::put('/{identifier}/pages/{id}', 'WikiPagesController@update');
                Route::delete('/{identifier}/pages/{id}', 'WikiPagesController@destroy');
                Route::post('/{identifier}/pages/{id}/watch', 'WikiPagesController@watch');
                Route::delete('/{identifier}/pages/{id}/watch', 'WikiPagesController@unwatch');
                Route::post('/{identifier}/pages/{id}/lock', 'WikiPagesController@lock');
                Route::delete('/{identifier}/pages/{id}/unlock', 'WikiPagesController@unlock');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'issues'
            ],
            function () {
                // issues
                Route::get('/', 'IssuesController@index');
                Route::post('/', 'IssuesController@store');
                Route::get('/filters', 'IssuesController@filters');
                Route::get('/{id}', 'IssuesController@show');
                Route::put('/{id}', 'IssuesController@update');
                Route::delete('/{id}', 'IssuesController@destroy');
                Route::post('/{id}/watch', 'IssuesController@watch');
                Route::delete('/{id}/watch', 'IssuesController@unwatch');

                // statuses
                Route::get('/statuses', 'IssueStatusesController@index');
                // todo: make other actions
//                Route::get('/statuses/{id}', 'IssueStatuseController@one');
//                Route::put('/statuses/{id}', 'IssueStatuseController@update');
//                Route::post('/statuses', 'IssueStatuseController@create');
//                Route::delete('/statuses/{id}', 'IssueStatuseController@destroy');

                // Categories
                Route::get('/categories/{identifier}', 'IssueCategoriesController@index');
                // todo: remove "IssueCategoriesController@show" if not use
                Route::get('/categories/{id}', 'IssueCategoriesController@show');
                Route::post('/categories/{identifier}', 'IssueCategoriesController@store');
                Route::put('/categories/{id}', 'IssueCategoriesController@update');
                Route::delete('/categories/{id}', 'IssueCategoriesController@destroy');
            }
        );

        Route::group(
            [
//                'middleware' => 'auth',
                'prefix' => 'users'
            ],
            function () {

                Route::get('/', [
                    'middleware' => 'admin',
                    'uses' => 'UsersController@index'
                ]);

                Route::get('/{id}', [
                    'middleware' => 'auth',
                    'uses' => 'UsersController@getUser'
                ]);

                Route::put('/{id}/updatestatus', [
                    'middleware' => 'auth',
                    'uses' => 'UsersController@updateUserStatus'
                ]);

                Route::put('/{id}', [
                    'middleware' => 'admin',
                    'uses' => 'UsersController@update'
                ]);

                Route::delete('/{id}', [
                    'middleware' => 'admin',
                    'uses' => 'UsersController@destroy'
                ]);
            }
        );

        Route::group(
            [
//                'middleware' => 'auth',
                'prefix' => 'groups'
            ],
            function () {
                Route::get('/', [
                    'middleware' => 'auth',
                    'uses' => 'GroupsController@getList'
                ]);

                Route::post('/', [
                    'middleware' => 'admin',
                    'uses' => 'GroupsController@create'
                ]);

                Route::delete('/{id}', [
                    'middleware' => 'admin',
                    'uses' => 'GroupsController@destroy'
                ]);

                Route::get('/{id}', [
                    'middleware' => 'auth',
                    'uses' => 'GroupsController@one'
                ]);

                Route::put('/{id}', [
                    'middleware' => 'admin',
                    'uses' => 'GroupsController@update'
                ]);
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
//                'middleware' => 'auth',
                'prefix' => 'settings'
            ],
            function () {
                Route::get('/', 'SettingsController@index');
                Route::get('/{name}', 'SettingsController@show');
            }
        );
    }
);

Route::any('{all}', function () {
    abort(404);
})->where('all', '.*');