import InjectableBase from 'base/injectable.base';
import myAccountComponent from './account/my-account.component';
import myPageComponent from './page/my-page.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class MyConfig extends InjectableBase {

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
                component: myAccountComponent.name,
            })
            .state('my.page', {
                url: '/page',
                component: myPageComponent.name,
            });
    }
}