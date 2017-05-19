import './bootstrap';
import 'angular';
import 'angular-sanitize';
import '@uirouter/angularjs';
import 'restangular';
import 'satellizer';
import 'angularjs-toaster';

import 'filters.module';
import 'services.module';
import 'pages/pages.module';

import MDI from 'common/mdi';
import AppRun from 'app.run';
import AppConfig from 'app.config';

angular
    .module(
        'app',
        [
            'ngSanitize',

            'ui.router',
            'restangular',
            'satellizer',
            'toaster',

            'app.filters',
            'app.pages',
            'app.services'
        ]
    )

    /**
     * Export module injector
     */
    .config((['$injector', $injector => MDI.$injector = $injector]))
    .config(() => new AppConfig())
    // .config(AppConfig.getDI())
    .run(AppRun.getDI());