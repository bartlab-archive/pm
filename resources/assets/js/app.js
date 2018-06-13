import './bootstrap';
import 'angular';
import 'angular-sanitize';
import '@uirouter/angularjs';
import 'restangular';
import 'angular-moment';
import 'angular-material';
import 'angular-messages';
import 'angular-animate';
import 'angular-aria';
import 'ng-showdown';
import 'angular-file-saver';
import 'angular-drag-and-drop-lists';

import 'modules/app.modules';

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
            'dndLists',

            'ui.router',
            'restangular',
            'ng-showdown',

            'app.modules'
        ]
    )
    .config(AppConfig.inst())
    .run(AppRun.inst());

/*
todo: code format by Google and Airbnb recomendations
 */