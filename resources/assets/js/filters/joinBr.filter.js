// (function () {
//     'use strict';
//
//     angular
//         .module('app.filters')
//         .filter('joinBr', joinBr);
//
//     function joinBr() {
//         return function (array) {
//             return angular.isArray(array) ? array.join('<br>') : '';
//         }
//     }
// })();

import 'angular';
import DI from 'common/di';

export default class JoinBrFilter extends DI {

    // static get $inject() {
    //     return ['$rootScope', '$http'];
    // }

    init() {
        console.log('JoinBrFilter', this);
        // return (...args) => this.filter(...args);

        return (array) => {
            return angular.isArray(array) ? array.join('<br>') : '';
        };
    }

    // filter(array){
    //     return angular.isArray(array) ? array.join('<br>') : '';
    // }
}