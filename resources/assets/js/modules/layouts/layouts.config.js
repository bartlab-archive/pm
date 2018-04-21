import InjectableBase from 'base/injectable.base';
import LayoutBlankComponent from './components/blank/layout-blank.component';
import LayoutDefaultComponent from './components/default/layout-default.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class LayoutConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('blank', {
                abstract: true,
                component: LayoutBlankComponent.getName()
            })
            .state('default', {
                abstract: true,
                component: LayoutDefaultComponent.getName()
            });
    }

}