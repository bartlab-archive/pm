import InjectableBase from 'base/injectable.base';
import MainIndexComponent from './components/index/main-index.component';
import MainLoginComponent from './components/login/main-login.component';
import MainRegistrationComponent from './components/registration/main-registration.component';
import MainLogoutComponent from './components/logout/main-logout.component';
import MainResetPasswordComponent from './components/reset-password/main-reset-password.component';
import Main404Component from './components/404/main-404.component';
import Main500Component from './components/500/main-500.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class MainConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'mainServiceProvider'];
    }

    $onInit() {
        this.mainServiceProvider
            .registerAppMenu({
                url: 'home',
                name: 'Home',
                icon: 'home'
            });

        this.$stateProvider
            .state('404', {
                parent: 'blank',
                url: '/404',
                views: {
                    content: {
                        component: Main404Component.getName()
                    }
                }
            })
            .state('500', {
                parent: 'blank',
                url: '/500',
                views: {
                    content: {
                        component: Main500Component.getName()
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
                        component: MainIndexComponent.getName()
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
                        component: MainLoginComponent.getName()
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
                        component: MainRegistrationComponent.getName()
                    }
                }
            })
            .state('logout', {
                url: '/logout',
                component: MainLogoutComponent.getName()
            })
            .state('reset-password', {
                data: {
                    access: '?',
                },
                url: '/reset-password',
                parent: 'blank',
                views: {
                    content: {
                        component: MainResetPasswordComponent.getName()
                    }
                }
            });
    }

}