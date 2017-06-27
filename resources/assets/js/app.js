import './bootstrap';
import 'angular';
import 'angular-sanitize';
import '@uirouter/angularjs';
import 'restangular';
import 'satellizer';
import 'angular-moment';
// import 'ng-table';
import 'md-data-table';
import 'angular-material';
import 'angular-messages';
import 'angular-animate';
import 'angular-aria';
import 'ng-showdown';


import 'directives.module';
import 'filters.module';
import 'services.module';
import 'components/components.module';

import AppRun from 'app.run';
import AppConfig from 'app.config';

angular
    .module(
        'app',
        [
            'ngSanitize',
            'ngAnimate',
            'ngAria',
            'ngMessages',
            'ngMaterial',
            'angularMoment',

            'ui.router',
            'restangular',
            'satellizer',
            'ng-showdown',
            // 'ngTable',
            'mdDataTable',

            'app.directives',
            'app.filters',
            'app.services',
            'app.components'
        ]
    )
    .config(AppConfig.inst())
    .run(AppRun.inst());