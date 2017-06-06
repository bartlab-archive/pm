import Injecteble from 'base/injectable';

/**
 * Class LayoutConfig
 *
 * @property $stateProvider
 */
export default class LayoutConfig extends Injecteble {

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