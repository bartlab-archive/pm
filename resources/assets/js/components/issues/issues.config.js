import InjectableBase from 'base/injectable.base';
import issuesListComponent from './list/issues-list.component';
import issuesEditCopyComponent from './edit-copy/issues-edit-copy.component';
import issuesInfoComponent from './info/issues-info.component';

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
                parent:'projects.inner',
            })
            .state('issues-inner.index', {
                url: '',
                component: issuesListComponent.name,
            })
            .state('issues-inner.new', {
                url: '/new',
                component: 'issuesNewComponent'
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
            });
    }

}

