import DI from 'common/di';

import MainIndexController from './index/main-index.controller';
import MainIndexTemplate from './index/main-index.html';

import MainLoginController from './login/main-login.controller';
import MainLoginTemplate from './login/main-login.html';

/**
 * @property $stateProvider
 */
export default class MainConfig extends DI {

    static get $inject() {
        return ['$stateProvider'];
    }

    init() {
        console.log('MainConfig', this);

        this.$stateProvider
        // .state('404', {
        //     parent: 'blank',
        //     url: '/404',
        //     views: {
        //         content: {
        //             controller: 'Main404Controller',
        //             templateUrl: 'pages/main/404/main-404.html'
        //         }
        //     }
        // })
        // .state('invite', {
        //     parent: 'blank',
        //     url: '/invite?email&company&invite',
        //     views: {
        //         content: {
        //             controller: 'MainInviteController',
        //             templateUrl: 'pages/main/invite/main-invite.html'
        //         }
        //     }
        // })
        // .state('500', {
        //     parent: 'blank',
        //     url: '/500',
        //     views: {
        //         content: {
        //             controller: 'Main500Controller',
        //             templateUrl: 'pages/main/500/main-500.html'
        //         }
        //     }
        // })
            .state('home', {
                // data: {
                //     access: '@'
                // },
                parent: 'default',
                url: '/',
                views: {
                    content: {
                        controller: MainIndexController,
                        template: MainIndexTemplate
                    }
                }
            })
            .state('login', {
                // data: {
                //     access: '?',
                //     deny_signed: true
                // },
                url: '/login',
                parent: 'blank',
                views: {
                    content: {
                        controller: MainLoginController,
                        controllerAs:'vm',
                        template: MainLoginTemplate
                    }
                }
            })
            // .state('signup', {
            //     data: {
            //         access: '?',
            //         deny_signed: true
            //     },
            //     url: '/signup?invite&email&refer',
            //     parent: 'blank',
            //     views: {
            //         content: {
            //             controller: 'MainRegistrationController',
            //             templateUrl: 'pages/main/registration/main-registration.html'
            //         }
            //     }
            // })
            // .state('profile', {
            //     data: {
            //         access: '@'
            //     },
            //     parent: 'default',
            //     url: '/profile',
            //     views: {
            //         content: {
            //             controller: 'ClientsEditController',
            //             templateUrl: 'pages/clients/edit/client-edit.html'
            //         }
            //     }
            // })
            // .state('confirm', {
            //     data: {
            //         access: '?',
            //         deny_signed: true
            //     },
            //     url: '/confirm/{auth_key}',
            //     parent: 'blank',
            //     views: {
            //         content: {
            //             controller: 'MainConfirmController',
            //             templateUrl: 'pages/main/confirm/main-confirm.html'
            //         }
            //     }
            // })
            // .state('reset', {
            //     data: {
            //         access: '?',
            //         deny_signed: true
            //     },
            //     url: '/reset',
            //     parent: 'blank',
            //     views: {
            //         content: {
            //             controller: 'MainResetController',
            //             templateUrl: 'pages/main/reset/main-reset.html'
            //         }
            //     }
            // })
            // .state('reset_password', {
            //     data: {
            //         access: '?',
            //         deny_signed: true
            //     },
            //     url: '/reset/{auth_key}',
            //     parent: 'blank',
            //     views: {
            //         content: {
            //             controller: 'MainResetPasswordController',
            //             templateUrl: 'pages/main/reset_password/main-reset-password.html'
            //         }
            //     }
            // })
            // .state('logout', {
            //     url: '/logout',
            //     controller: 'MainLogoutController'
            // });
        ;
    }
}