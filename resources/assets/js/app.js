import './bootstrap';
import 'angular';
import 'angular-sanitize';
import '@uirouter/angularjs';
import 'restangular';
import 'satellizer';
import 'ng-table';
import 'angular-material';
import 'angular-messages';
import 'angular-animate';
import 'angular-aria';

import 'filters.module';
import 'services.module';
import 'components/components.module';

import ProjectsService from 'services/projects.service';

import appRun from 'app.run';
import appConfig from 'app.config';

angular
    .module(
        'app',
        [
            'ngSanitize',
            'ngAnimate',
            'ngAria',
            'ngMessages',
            'ngMaterial',

            'ui.router',
            'restangular',
            'satellizer',
            'ngTable',

            'app.filters',
            'app.components',
            'app.services'
        ]
    )
    .service('ProjectsService', ProjectsService)
    .config(appConfig)
    .run(appRun);