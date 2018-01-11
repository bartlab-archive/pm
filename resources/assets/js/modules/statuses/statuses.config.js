import InjectableBase from 'base/injectable.base';
import statusesIndexComponent from './components/index/statuses-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class StatusesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('statuses', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/issue_statuses',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('statuses.index', {
                url: '',
                component: statusesIndexComponent.name,
            });
    }

}