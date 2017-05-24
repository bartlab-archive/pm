// (function () {
//     'use strict';
//
//     angular
//         .module('app.pages.main')
//         .controller('MainLogoutController', MainLogoutController);
//
//     /* @ngInject */
//     function MainLogoutController($auth, $state) {
//
//         // --- init ---
//
//         $auth.logout();
//         $state.go('home');
//     }
// })();

export default class MainLogoutController {

    static get $inject() {
        return ['toaster', '$auth', '$state'];
    }

    constructor(toaster, $auth, $state) {
        this.toaster = toaster;
        this.$auth = $auth;
        this.$state = $state;
    }

    $onInit() {
        this.toaster.pop({
            type: 'warning',
            body: 'Logout'
        });

        this.$auth.logout();
        this.$state.go('home');
    }

}