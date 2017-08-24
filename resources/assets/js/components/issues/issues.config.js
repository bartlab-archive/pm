import InjectableBase from "base/injectable.base";
import issuesListComponent from './list/issues-list.component';
import issuesEditComponent from './edit/issues-edit.component';
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
                component: issuesEditComponent.name,
            })
            .state('issues.info', {
                url: '/:id',
                component: issuesInfoComponent.name,
            });
    }

}

