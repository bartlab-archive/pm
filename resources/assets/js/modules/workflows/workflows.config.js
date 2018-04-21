import InjectableBase from 'base/injectable.base';
import WorkflowsIndexComponent from './components/index/workflows-index.component';
import WorkflowsEditComponent from './components/edit/workflows-edit.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} MainServiceProvider
 */
export default class StatusesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'mainServiceProvider']
    }

    $onInit() {
        this.mainServiceProvider
            .registerAdminMenu({
                name: 'Workflow',
                url: 'workflows.edit',
                icon: 'assignment_return'
            });

        this.$stateProvider
            .state('workflows', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/workflows',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('workflows.index', {
                url: '',
                component: WorkflowsIndexComponent.getName(),
            })
            .state('workflows.edit', {
                url: '/edit',
                component: WorkflowsEditComponent.getName(),
            });
    }

}