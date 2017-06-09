import InjectableBase from 'base/injectable.base';
import mainIndexComponent from './index/main-index.component';
import mainLoginComponent from './login/main-login.component';
import mainRegistrationComponent from './registration/main-registration.component';
import mainLogoutComponent from './logout/main-logout.component';
import mainResetPasswordComponent from './reset-password/main-reset-password.component';
import main404Component from './404/main-404.component';
import main500Component from './500/main-500.component';

/**
 * Class MainConfig
 *
 * @property $stateProvider
 */
export default class MainConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider'];
    }

    $onInit() {
        this.$stateProvider
            .state('404', {
                parent: 'blank',
                url: '/404',
                views: {
                    content: {
                        component: main404Component.name
                    }
                }
            })
            .state('500', {
                parent: 'blank',
                url: '/500',
                views: {
                    content: {
                        component: main500Component.name
                    }
                }
            })
            .state('home', {
                data: {
                    access: '@'
                },
                parent: 'default',
                url: '/',
                views: {
                    content: {
                        component: mainIndexComponent.name
                    }
                }
            })
            .state('login', {
                data: {
                    access: '?',
                },
                url: '/login',
                parent: 'blank',
                views: {
                    content: {
                        component: mainLoginComponent.name
                    }
                }
            })
            .state('signup', {
                data: {
                    access: '?',
                },
                url: '/signup',
                parent: 'blank',
                views: {
                    content: {
                        component: mainRegistrationComponent.name
                    }
                }
            })
            .state('logout', {
                url: '/logout',
                component: mainLogoutComponent.name
            })
            .state('reset-password', {
                data: {
                    access: '?',
                },
                url: '/reset-password',
                parent: 'blank',
                views: {
                    content: {
                        component: mainResetPasswordComponent.name
                    }
                }
            });
    }
}