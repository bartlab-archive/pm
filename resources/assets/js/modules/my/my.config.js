import InjectableBase from 'base/injectable.base';
import MyAccountComponent from './components/account/my-account.component';
import MyPageComponent from './components/page/my-page.component';
import MyChangePasswordComponent from './components/change-password/my-change-password.component';
import MyEmailsComponent from "./components/emails/my-emails.component";

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
            .state('my.password', {
                url: '/password',
                component: MyChangePasswordComponent.getName(),
            })
            .state('my.page', {
                url: '/page',
                component: MyPageComponent.getName(),
            })
            .state('my.emails', {
                url: '/emails',
                component: MyEmailsComponent.getName(),
            });
    }

}