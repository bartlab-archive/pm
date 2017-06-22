import InjectableBase from 'base/injectable.base';
import layoutBlankComponent from './blank/layout-blank.component';
import layoutDefaultComponent from './default/layout-default.component';
import layoutProjectComponent from './project/layout-project.component';

/**
 * Class LayoutConfig
 *
 * @property $stateProvider
 */
export default class LayoutConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('blank', {
                abstract: true,
                component: layoutBlankComponent.name
            })
            .state('default', {
                abstract: true,
                component: layoutDefaultComponent.name
            })
            .state('project', {
                abstract: true,
                parent: 'default',
                views: {
                    content: {
                        component: layoutProjectComponent.name
                    }
                }

            });
    }
}