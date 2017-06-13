import './bootstrap';
import 'angular';
import 'angular-sanitize';
import '@uirouter/angularjs';
import 'restangular';
import 'satellizer';
// import 'ng-table';
import 'md-data-table';
import 'angular-material';
import 'angular-messages';
import 'angular-animate';
import 'angular-aria';

import 'directives.module';
import 'filters.module';
import 'services.module';
import 'components/components.module';

import AppRun from 'app.run';
import AppConfig from 'app.config';

import ProjectsService from 'services/projects.service';
import IssuesService from 'services/issues.service';

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
            // 'ngTable',
            'mdDataTable',

            'app.directives',
            'app.filters',
            'app.components',
            'app.services'
        ]
    )
    .config(AppConfig.inst())
    .run(AppRun.inst())
    .service('ProjectsService', ProjectsService)
    .service('IssuesService', IssuesService);
    // .config(appConfig)
    // .run(AppRun.inst());