import InjectableBase from 'base/injectable.base';
import MyAccountComponent from './components/account/my-account.component';
import MyPageComponent from './components/page/my-page.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class MyConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'mainServiceProvider'];
    }

    $onInit() {
        this.mainServiceProvider
            .registerAppMenu({
                url: 'my.page',
                name: 'My page',
                icon: 'person'
            });

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
                component: MyAccountComponent.getName(),
            })
            .state('my.page', {
                url: '/page',
                component: MyPageComponent.getName(),
            });
    }

}