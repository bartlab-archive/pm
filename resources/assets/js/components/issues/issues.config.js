import InjectableBase from "base/injectable.base";
import issuesListComponent from './list/issues-list.component';
import issuesEditCopyComponent from './edit-copy/issues-edit-copy.component';
import issuesInfoComponent from './info/issues-info.component';
import issuesWatchComponent from './watch/issues-watch.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class IssuesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider'];
    }

    $onInit() {
        this.$stateProvider
            .state('issues', {
                abstract: true,
                data: {
                    access: '@',
                    layoutDefault: {
                        projectId: null,
                        showProjectMenu: true
                    }
                },
                url: '/issues',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('issues.list', {
                url: '',
                component: issuesListComponent.name,
            })
            .state('issues.edit', {
                url: '/:id/edit',
                component: issuesEditCopyComponent.name,
            })
            .state('issues.copy', {
                url: '/:id/copy',
                component: issuesEditCopyComponent.name,
            })
            .state('issues.info', {
                url: '/:id',
                component: issuesInfoComponent.name,
            })
            .state('issues.watch', {
                url: '/:id/watch',
                component: issuesWatchComponent.name,
            })
            .state('issues.unwatch', {
                url: '/:id/unwatch',
                component: issuesWatchComponent.name,
            });
    }

}

