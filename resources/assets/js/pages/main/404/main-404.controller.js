(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('Main404Controller', Main404Controller);

    /* @ngInject */
    function Main404Controller(pageService) {

        // --- init ---

        pageService.reset().addCrumb({name:'404',path:'404'});
    }
})();