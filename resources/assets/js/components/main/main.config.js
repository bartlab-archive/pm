MainConfig.$inject = ['$stateProvider'];

export default function MainConfig($stateProvider) {

    $stateProvider
        .state('404', {
            parent: 'blank',
            url: '/404',
            views: {
                content: {
                    component: 'main404',
                }
            }
        })
        .state('500', {
            parent: 'blank',
            url: '/500',
            views: {
                content: {
                    component: 'main500',
                }
            }
        })
        .state('home', {
            // data: {
            //     access: '@'
            // },
            parent: 'default',
            url: '/',
            views: {
                content: {
                    component: 'mainIndex',
                }
            }
        })
        .state('login', {
            // data: {
            //     access: '?',
            // },
            url: '/login',
            parent: 'blank',
            views: {
                content: {
                    component: 'mainLogin',
                }
            }
        })
        .state('signup', {
            // data: {
            //     access: '?',
            // },
            url: '/signup',
            parent: 'blank',
            views: {
                content: {
                    component: 'mainRegistration',
                }
            }
        })
        .state('reset', {
            // data: {
            //     access: '?',
            // },
            url: '/reset',
            parent: 'blank',
            views: {
                content: {
                    component: 'mainReset',
                }
            }
        })
        .state('logout', {
            url: '/logout',
            component: 'mainLogout'
        });
};