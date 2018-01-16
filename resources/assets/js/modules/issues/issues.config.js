import InjectableBase from 'base/injectable.base';
import issuesListComponent from './components/list/issues-list.component';
import issuesEditCopyComponent from './components/edit-copy/issues-edit-copy.component';
import issuesInfoComponent from './components/info/issues-info.component';

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
                params: {
                    assigned_to_ids: {
                        value: null,
                        dynamic: true
                    },
                    author_ids:{
                        value: null,
                        dynamic: true
                    }
                },
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

