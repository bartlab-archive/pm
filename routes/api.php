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
                Route::put('account', 'AccountController@update');
                Route::put('password', 'AccountController@changePassword');
                Route::get('api-key', 'AccountController@showApiKey');
                Route::put('api-key', 'AccountController@resetApiKey');
                Route::put('rss-key', 'AccountController@resetAtomKey');
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
                Route::post('/', 'ProjectsController@create');
                Route::put('/{identifier}', 'ProjectsController@update');
                Route::delete('/{identifier}', 'ProjectsController@destroy');
                Route::get('/{identifier}/trackers', 'ProjectsController@getProjectTrackers');

                Route::post('/{identifier}/issues', 'IssuesController@project');

                Route::get('/{identifier}/news', 'NewsController@getProjectNews');

//                Route::put('/{identifier}/wiki/{name}', 'WikiController@setWikiPageMarkDown');
                Route::get('/{identifier}/wiki', 'WikiController@getWikiPageMarkDown');
                Route::get('/{identifier}/wiki/all', 'WikiController@getAllWikiPage');
                Route::post('/{identifier}/new', 'WikiController@addNewWiki');
                Route::get('/{identifier}/wiki/{page_title}', 'WikiController@getWikiPageMarkDown');
                Route::delete('/{identifier}/wiki/{page_title}', 'WikiController@deleteWikiPage');
                Route::put('/{identifier}/wiki/{name}/{id}', 'WikiController@setWikiPageMarkDown');

                Route::get('/attachments/{identifier}', 'AttachmentsController@index');
                Route::get('/attachments/download/{id}', 'AttachmentsController@download');
                Route::delete('/attachments/{id}', 'AttachmentsController@delete');

                Route::put('/{identifier}/modules', 'ProjectsController@updateProjectModules');
                Route::put('/{identifier}/information', 'ProjectsController@updateProjectInformation');

                Route::post('/{identifier}/members', 'ProjectsController@createMember');
                Route::delete('/members/{memberId}', 'ProjectsController@deleteMember');
                Route::put('/members/{memberId}', 'ProjectsController@updateMember');

                Route::post('/{identifier}/versions', 'ProjectsController@createVersion');
                Route::delete('/versions/{versionId}', 'ProjectsController@deleteVersion');
                Route::put('/versions/{versionId}', 'ProjectsController@updateVersion');
                Route::put('/{identifier}/versions/close-completed', 'ProjectsController@closeCompletedVersion');

                Route::post('/{identifier}/issue-categories', 'ProjectsController@createIssueCategory');
                Route::delete('/issue-categories/{issueCategoryId}', 'ProjectsController@deleteIssueCategory');
                Route::put('/issue-categories/{issueCategoryId}', 'ProjectsController@updateIssueCategory');

                Route::put('/wiki/{wikiId}', 'ProjectsController@updateWiki');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'roles'
            ],
            function () {
                Route::get('/', 'RolesController@getList');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'filters'
            ],
            function () {
                Route::get('/', 'IssuesController@getIssuesFilters');
            }
        );

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
                Route::get('/info', 'IssuesController@getAdditionalInfo');
                Route::get('/{id}', 'IssuesController@getIssue');
                Route::get('/', 'IssuesController@getIssues');
                Route::post('/', 'IssuesController@create');
                Route::put('/{id}', 'IssuesController@update');
//                Route::get('/{id}/infoedit/{project_id}', 'IssuesController@infoEdit');
            }
        );

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'users'

            ],
            function () {
                Route::get('/', 'UsersController@getList');
            }
        );
    }
);