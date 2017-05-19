import 'angular';
import JoinBrFilter from 'filters/joinBr.filter';

angular.module('app.filters', [])
    .filter('joinBr', JoinBrFilter.getDI());