import 'angular';
import joinBrFilter from 'filters/joinBr.filter';
import nl2pFilter from 'filters/nl2p.filter';
import wordsFilter from 'filters/words.filter';

angular.module('app.filters', [])
    .filter('nl2p', nl2pFilter)
    .filter('words', wordsFilter)
    .filter('joinBr', joinBrFilter);