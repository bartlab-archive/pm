import 'angular';
import joinBrFilter from 'filters/joinBr.filter';

angular.module('app.filters', [])
    .filter('joinBr', joinBrFilter);