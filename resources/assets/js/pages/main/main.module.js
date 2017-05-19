import 'angular';
import MainConfig from './main.config';

angular.module('app.pages.main', [])
    .config(MainConfig.getDI());