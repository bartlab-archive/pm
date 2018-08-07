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
                Route::get('/{id}', 'AttachmentsController@download');
//                Route::get('/{identifier}', 'ProjectsController@show');
                Route::post('/', 'AttachmentsController@upload');
                Route::put('/{id}', 'AttachmentsController@update');
                Route::delete('/{id}', 'AttachmentsController@delete');
//                Route::put('/{identifier}', 'ProjectsController@update');

            }
        );

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
                'prefix' => 'enumerations'
            ],
            function () {
                Route::get('/', 'EnumerationsController@index');
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

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'issues'
            ],
            function () {
                // issues
                Route::get('/', 'IssuesController@index');
                Route::post('/', 'IssuesController@store');
//                Route::get('/filters', 'IssuesController@filters');
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
                // todo: add 'project' to url - /categories/project/{identifier}
                Route::get('/categories/{identifier}', 'IssueCategoriesController@index');
                Route::post('/categories/{identifier}', 'IssueCategoriesController@store');
                Route::get('/categories/{id}', 'IssueCategoriesController@show');
                Route::put('/categories/{id}', 'IssueCategoriesController@update');
                Route::delete('/categories/{id}', 'IssueCategoriesController@destroy');

                // tackers
                Route::get('/trackers', 'TrackersController@index');
                Route::get('/trackers/project/{identifier}', 'ProjectTrackersController@index');
//                Route::get('/trackers/project/{identifier}/state', 'TrackersProjectController@show');
                Route::put('/trackers/project/{identifier}', 'ProjectTrackersController@update');
            }
        );

        // todo: move to projects group (?)
        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'members'
            ],
            function () {
                // todo: add identifier to route - /members/{identifier} or move to projects group
                Route::post('/', 'MembersController@store');
                Route::put('/{id}', 'MembersController@update');
                Route::delete('/{id}', 'MembersController@destroy');
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

//        Route::group(
//            [
//                'middleware' => 'auth',
//                'prefix' => 'trackers'
//            ],
//            function () {
//                Route::get('/', 'TrackersController@index');
//            }
//        );

//        Route::group(
//            [
//                //'middleware' => 'auth',
//                'prefix' => 'agile'
//            ],
//            function () {
//                Route::get('/', 'AgileController@getList');
//            }
//        );


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
//                'middleware' => 'auth',
                'prefix' => 'settings'
            ],
            function () {
                Route::get('/', 'SettingsController@index');
                Route::get('/{name}', 'SettingsController@show');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'users'
            ],
            function () {
                Route::get('/', 'UsersController@index');
                Route::get('/{id}', 'UsersController@show');
                Route::put('/{id}/updatestatus', 'UsersController@updateUserStatus');
                Route::put('/{id}', 'UsersController@update');
                Route::delete('/{id}', 'UsersController@destroy');
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
    }
);

Route::any('{all}', function () {
    abort(404);
})->where('all', '.*');