import InjectableBase from 'base/injectable.base';
import issuesListComponent from './components/list/issues-list.component';
// import issuesEditCopyComponent from './components/edit-copy/issues-edit-copy.component';
import issuesInfoComponent from './components/info/issues-info.component';
import issuesFormComponent from './components/form/issues-form.component';
import issuesProjectSettingsComponent from './components/project-settings/issues-project-settings.component';

/**
 * @property {object} $stateProvider
 * @property {object} ProjectsServiceProvider
 * @property {object} MainServiceProvider
 */
export default class IssuesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'ProjectsServiceProvider', 'MainServiceProvider'];
    }

    $onInit() {
        this.ProjectsServiceProvider
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
                component: issuesProjectSettingsComponent.name,
                module: 'issue_tracking'
            });

        this.MainServiceProvider
            .registerAdminMenu({
                name: 'Issue statuses',
                url: 'statuses.index',
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
                single: true,
                enable: false
            })
            .registerNewItemMenu({
                name: 'Category',
                url: '',
                icon: 'folder',
                module: 'issue_tracking',
                single: false,
                enable: false

            });

        this.$stateProvider
            .state('issues', {
                abstract: true,
                data: {
                    access: '@'
                },
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
                url: '/issues',
                parent: 'projects.inner',
            })
            .state('issues-inner.list', {
                url: '',
                component: issuesListComponent.name,
            })
            .state('issues-inner.new', {
                url: '/new',
                component: issuesFormComponent.name
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
                component: issuesListComponent.name,
            })
            .state('issues.edit', {
                url: '/:id/edit',
                component: issuesFormComponent.name,
                // component: issuesEditCopyComponent.name,
            })
            .state('issues.copy', {
                url: '/:id/copy',
                component: issuesFormComponent.name,
                // component: issuesEditCopyComponent.name,
            })
            .state('issues.info', {
                url: '/:id',
                component: issuesInfoComponent.name,
            });
    }

}

