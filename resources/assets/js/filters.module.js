import 'angular';
import joinFilter from 'filters/join.filter';
import nl2pFilter from 'filters/nl2p.filter';
import wordsFilter from 'filters/words.filter';
import bytesToSizeUnitsFilter from 'filters/bytesToSizeUnits.filter';

angular.module('app.filters', [])
    .filter('nl2p', nl2pFilter)
    .filter('words', wordsFilter)
    .filter('join', joinFilter)
    .filter('bytesToSizeUnitsFilter', bytesToSizeUnitsFilter);