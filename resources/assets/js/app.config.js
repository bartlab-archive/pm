import DI from 'common/di';
import LayoutBlankTemplate from 'layouts/layout-blank.html';
import LayoutDefaultTemplate from 'layouts/layout-default.html';
import LayoutBlankController from 'layouts/layout-blank.controller';
import LayoutDefaultController from 'layouts/layout-default.controller';

/**
 * @property $stateProvider
 */
export default class AppConfig extends DI {

    static get $inject() {
        return ['$stateProvider', '$urlRouterProvider','$locationProvider'];
    }

    init() {
        console.log('AppConfig', this);

        this.$stateProvider

        // app blank layout
            .state('blank', {
                abstract: true,
                controller: LayoutBlankController,
                template: LayoutBlankTemplate //'layouts/layout-blank.html'
            })

            // app default layout
            .state('default', {
                abstract: true,
                // parent: 'blank',
                // views: {
                //     content: {
                controller: LayoutDefaultController,
                template: LayoutDefaultTemplate //'layouts/layout-default.html'
                // }
                // }

            });

        // set default routes when no path specified
        this.$urlRouterProvider.when('', '/');
        //$urlRouterProvider.when('/', '/main/index');

        // always goto 404 if route not found
        //$urlRouterProvider.otherwise('/');
        this.$urlRouterProvider.otherwise('/404');

        this.$locationProvider.html5Mode(true);
    }
}