import InjectableBase from 'base/injectable.base';
import IssuesListComponent from './components/list/issues-list.component';
import IssuesInfoComponent from './components/info/issues-info.component';
import IssuesFormComponent from './components/form/issues-form.component';
import IssuesProjectSettingsComponent from './components/project-settings/issues-project-settings.component';
import IssuesImportsComponent from './components/imports/issues-imports.component';
import IssuesReportComponent from './components/report/issues-report.component';
import IssueStatusComponent from './components/status/issues-status.component';
import IssuesMyAssignedComponent from './components/my-assigned/issues-my-assigned.component';
import IssuesMyReportedComponent from './components/my-reported/issues-my-reported.component';
import IssuesMyWatchedComponent from './components/my-watched/issues-my-watched.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {ProjectsServiceProvider} projectsServiceProvider
 * @property {MainServiceProvider} mainServiceProvider
 * @property {MyServiceProvider} myServiceProvider
 */
export default class IssuesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider', 'mainServiceProvider', 'myServiceProvider'];
    }

    $onInit() {
        this.projectsServiceProvider
            .registerModule({
                url: 'issues-inner.list',
                title: 'Issues',
                name: 'issue_tracking',
                enable: false,
                alt: [/^issues\.*/]
            })
            .registerSettings({
                url: 'categories',
                name: 'Issue categories',
                component: IssuesProjectSettingsComponent.getName(),
                module: 'issue_tracking'
            });

        this.mainServiceProvider
            .registerAdminMenu({
                name: 'Issue statuses',
                url: 'issues-statuses.index',
                icon: 'done'
            })
            .registerAppMenu({
                url: 'issues.list',
                name: 'View all issues',
                icon: 'list'
            })
            .registerNewItemMenu({
                name: 'Issue',
                url: 'issues-inner.new',
                icon: 'create',
                module: 'issue_tracking',
                single: 'issues.new',
                enable: false
            })
            .registerNewItemMenu({
                name: 'Category',
                // todo: make url to create category
                url: '',
                icon: 'folder',
                module: 'issue_tracking',
                single: false,
                enable: false

            });

        this.myServiceProvider
            .registerModule({
                // todo: make url with filter
                // url: 'issues.list',
                // title: 'Reported issues',
                // name: 'issue_tracking',
                component: IssuesMyReportedComponent.getName()
            })
            .registerModule({
                // todo: make url with filter
                // url: 'issues.list',
                // title: 'Issues assigned to me',
                // name: 'issue_tracking',
                component: IssuesMyAssignedComponent.getName()
            })
            .registerModule({
                // todo: make url with filter
                // url: 'issues.list',
                // title: 'Watched issues',
                // name: 'issue_tracking',
                component: IssuesMyWatchedComponent.getName()
            });

        this.$stateProvider
            .state('issues', {
                abstract: true,
                // data: {
                //     access: '@'
                // },
                url: '/issues',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('issues-inner', {
                abstract: true,
                data: {
                    layout: {
                        insideProject: true
                    }
                },
                url: '/issues',
                parent: 'projects.inner',
            })
            .state('issues-inner.list', {
                url: '',
                component: IssuesListComponent.getName(),
            })
            .state('issues.list', {
                url: '',
                params: {
                    assigned_to_ids: {
                        value: null,
                        dynamic: true
                    },
                    author_ids: {
                        value: null,
                        dynamic: true
                    }
                },
                component: IssuesListComponent.getName(),
            })
            .state('issues-inner.report', {
                url: '/report',
                component: IssuesReportComponent.getName()
            })
            .state('issues.imports', {
                url: '/imports',
                component: IssuesImportsComponent.getName()
            })
            .state('issues.new', {
                url: '/new',
                component: IssuesFormComponent.getName()
            })
            .state('issues-inner.new', {
                url: '/new',
                component: IssuesFormComponent.getName()
            })
            .state('issues.edit', {
                data: {
                    layout: {
                        insideProject: true
                    }
                },
                url: '/:id/edit',
                component: IssuesFormComponent.getName(),
            })
            .state('issues-inner.copy', {
                url: '/:id/copy',
                component: IssuesFormComponent.getName(),
            })
            .state('issues.info', {
                url: '/:id',
                data: {
                    layout: {
                        insideProject: true
                    }
                },
                component: IssuesInfoComponent.getName(),
            })
            .state('issues-statuses', {
                abstract: true,
                data: {
                    access: '!'
                },
                url: '/issue_statuses',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('issues-statuses.index', {
                url: '',
                component: IssueStatusComponent.getName(),
            });
    }

}

