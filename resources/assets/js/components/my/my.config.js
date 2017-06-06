import Injecteble from 'base/injectable';

/**
 * Class MyConfig
 *
 * @property $stateProvider
 */
export default class MyConfig extends Injecteble {

    static get $inject() {
        return ['$stateProvider'];
    }

    $onInit() {
        this.$stateProvider
            .state('my', {
                abstract: true,
                parent: 'default',
                url: '/my',
                // data: {
                //   access: '@'
                // },
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('my.account', {
                url: '/account',
                component: 'myAccountComponent',
            })
            .state('my.password', {
                url: '/password',
                component: 'myPasswordComponent',
            });
    }
}