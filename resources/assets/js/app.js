import './bootstrap';
import 'angular';
import 'angular-sanitize';
import '@uirouter/angularjs';
import 'restangular';
import 'satellizer';
import 'angularjs-toaster';

import 'filters.module';
import 'services.module';
import 'components/components.module';

import appRun from 'app.run';
import appConfig from 'app.config';

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
            'app.components',
            'app.services'
        ]
    )

    .config(appConfig)
    .run(appRun);