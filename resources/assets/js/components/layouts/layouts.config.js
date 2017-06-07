import InjectableBase from 'base/injectable.base';

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
                component: 'layoutBlankComponent'
            })
            .state('default', {
                abstract: true,
                component: 'layoutDefaultComponent'
            });
    }
}