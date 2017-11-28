import './bootstrap';
import 'angular';
import 'angular-sanitize';
import '@uirouter/angularjs';
import 'restangular';
import 'satellizer';
import 'angular-moment';
import 'angular-material';
import 'angular-messages';
import 'angular-animate';
import 'angular-aria';
import 'ng-showdown';
import 'angular-file-saver';
// import 'ng-scrollbars';

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
            'ngFileSaver',

            'ui.router',
            'restangular',
            'satellizer',
            'ng-showdown',
            // 'ngScrollbars',

            'app.directives',
            'app.filters',
            'app.services',
            'app.components'
        ]
    )
    .config(AppConfig.inst())
    .run(AppRun.inst());