import './bootstrap';
import 'angular';
import 'angular-sanitize';
import '@uirouter/angularjs';
import 'restangular';
import 'satellizer';
import 'angularjs-toaster';
import 'ng-table';
import 'angular-ui-bootstrap';
import 'angular-loading-bar';

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

            'ui.router',
            'ui.bootstrap',
            'restangular',
            'satellizer',
            'toaster',
            'ngTable',
            'angular-loading-bar',

            'app.filters',
            'app.components',
            'app.services'
        ]
    )
    .service('ProjectsService',ProjectsService)
    .config(appConfig)
    .run(appRun);