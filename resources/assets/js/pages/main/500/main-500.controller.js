(function () {
    'use strict';

    angular
        .module('app.pages.main')
        .controller('Main500Controller', Main500Controller);

    /* @ngInject */
    function Main500Controller(pageService) {

        // --- init ---

        pageService.reset().addCrumb({name:'500',path:'500'});
    }
})();