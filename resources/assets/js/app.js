import './bootstrap';
import 'angular';
import 'angular-sanitize';
import '@uirouter/angularjs';
import 'restangular';
import 'satellizer';
// import 'ng-table';
import 'md-data-table';
import 'angular-material';
import 'angular-animate';
import 'angular-aria';

import 'filters.module';
import 'services.module';
import 'components/components.module';

import ProjectsService from 'services/projects.service';
import IssuesService from 'services/issues.service';

import appRun from 'app.run';
import appConfig from 'app.config';

angular
    .module(
        'app',
        [
            'ngSanitize',
            'ngAnimate',
            'ngAria',
            // 'ngMessages',
            'ngMaterial',

            'ui.router',
            'restangular',
            'satellizer',
            // 'ngTable',
            'mdDataTable',

            'app.filters',
            'app.components',
            'app.services'
        ]
    )
    .service('ProjectsService', ProjectsService)
    .service('IssuesService', IssuesService)
    .config(appConfig)
    .run(appRun);