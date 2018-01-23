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
//                Route::get('/issues', 'IssuesController@getIssues');
//                Route::post('/issues', 'IssuesController@getIssues');
                Route::get('/', 'ProjectsController@index');
                Route::get('/{identifier}', 'ProjectsController@show');
                Route::post('/', 'ProjectsController@create');
                Route::put('/{identifier}', 'ProjectsController@update');
                Route::delete('/{identifier}', 'ProjectsController@destroy');
//                Route::get('/{identifier}/issues-count', 'ProjectsController@getProjectIssuesCount');

//                Route::post('/{identifier}/issues', 'IssuesController@project');

//                Route::get('/{identifier}/news', 'NewsController@getProjectNews');

//                Route::put('/{identifier}/wiki/{name}', 'WikiController@setWikiPageMarkDown');
//                Route::get('/{identifier}/wiki', 'WikiController@getWikiPageMarkDown');
//                Route::get('/{identifier}/wiki/all', 'WikiController@getAllWikiPage');
//                Route::post('/{identifier}/new', 'WikiController@addNewWiki');
//                Route::get('/{identifier}/wiki/{page_title}', 'WikiController@getWikiPageMarkDown');
//                Route::delete('/{identifier}/wiki/{page_title}', 'WikiController@deleteWikiPage');
//                Route::put('/{identifier}/wiki/{name}/{id}', 'WikiController@setWikiPageMarkDown');

//                Route::get('/attachments/{identifier}', 'AttachmentsController@index');
//                Route::get('/attachments/download/{id}', 'AttachmentsController@download');
//                Route::delete('/attachments/{id}', 'AttachmentsController@delete');

                Route::put('/{identifier}/modules', 'ProjectsController@updateProjectModules');
                Route::put('/{identifier}/information', 'ProjectsController@updateProjectInformation');
                Route::put('/{identifier}/updatestatus', 'ProjectsController@updateProjectStatus');

//                Route::post('/{identifier}/members', 'ProjectsController@createMember');
//                Route::delete('/members/{memberId}', 'ProjectsController@deleteMember');
//                Route::put('/members/{memberId}', 'ProjectsController@updateMember');
//
//                Route::post('/{identifier}/versions', 'ProjectsController@createVersion');
//                Route::delete('/versions/{versionId}', 'ProjectsController@deleteVersion');
//                Route::put('/versions/{versionId}', 'ProjectsController@updateVersion');
//                Route::put('/{identifier}/versions/close-completed', 'ProjectsController@closeCompletedVersion');

//                Route::post('/{identifier}/issue-categories', 'ProjectsController@createIssueCategory');
//                Route::delete('/issue-categories/{issueCategoryId}', 'ProjectsController@deleteIssueCategory');
//                Route::put('/issue-categories/{issueCategoryId}', 'ProjectsController@updateIssueCategory');

//                Route::put('/wiki/{wikiId}', 'ProjectsController@updateWiki');

//                Route::post('/{identifier}/forums', 'ProjectsController@createForum');
//                Route::delete('/forums/{forumId}', 'ProjectsController@deleteForum');
//                Route::put('/forums/{forumId}', 'ProjectsController@updateForum');

//                Route::post('/{identifier}/activities', 'ProjectsController@createActivity');
//                Route::delete('/activities/{activityId}', 'ProjectsController@deleteActivity');
//                Route::put('/activities/{activityId}', 'ProjectsController@updateActivity');

//                Route::get('/{identifier}/activity', 'ProjectsController@getActivity');
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


//		Route::group(
//			[
//				'prefix' => 'test'
//			],
//			function () {
//				Route::get('/', function (Request $request){
//					$model = new \App\Models\Project();
//					return $model->where($model->getLeftColumnName(), $request->input('lft'))
//						->where($model->getRightColumnName(), $request->input('rgt'))
//						->first()->descendantsAndSelf()->get()->toHierarchy();
//				});
//			}
//		);

        Route::group(
            [
                'middleware' => 'auth',
                'prefix' => 'enumerations'
            ],
            function () {
                Route::get('/', 'EnumerationsController@getList');
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
                Route::get('/', 'IssuesController@all');
                Route::post('/', 'IssuesController@create');
                Route::get('/filters', 'IssuesController@filters');
                Route::get('/{id}', 'IssuesController@one');
                Route::put('/{id}', 'IssuesController@update');
                Route::delete('/{id}', 'IssuesController@delete');
                Route::get('/{id}/history', 'IssuesController@history');
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
                Route::get('/', 'UsersController@getList');
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