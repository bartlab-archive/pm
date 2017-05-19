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
    .config(()=> new AppConfig())
    // .config(AppConfig.getDI())
    .run(AppRun.getDI());