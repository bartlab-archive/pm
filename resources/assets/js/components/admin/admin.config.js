import InjectableBase from 'base/injectable.base';

/**
 * Class AdminConfig
 *
 * @property $stateProvider
 */
export default class AdminConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('admin', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/admin',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('admin.index', {
                url: '',
                component: 'adminIndexComponent',
            });
    }
}