(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('MainLogoutController', MainLogoutController);

    /* @ngInject */
    function MainLogoutController($auth, $state) {

        // --- init ---

        $auth.logout();
        $state.go('home');
    }
})();