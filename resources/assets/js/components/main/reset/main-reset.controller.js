// (function () {
//     'use strict';
//
//     angular
//         .module('app.pages.main')
//         .controller('MainResetController', MainResetController);
//
//     /* @ngInject */
//     function MainResetController($scope, $window, $auth, $state, toaster, pageService, userService) {
//
//         // --- vars ---
//
//         $scope.email = '';
//
//         $scope.errors = {};
//
//         // --- methods ---
//
//         $scope.back = function () {
//             $window.history.back();
//         };
//
//         $scope.submit = function () {
//             userService.reset($scope.email).then(
//                 function (response) {
//                     if (response.data[0].result) {
//                         toaster.pop({type: 'success', body: "Confirm email was sent!"});
//                     }
//                     $scope.errors = response.data[0].errors;
//                     console.log('empty errors => ' + $scope.errors);
//                 }, function () {
//                     toaster.pop({type: 'error', body: "User is not found!"});
//                 }
//             );
//         };
//
//         // --- init ---
//
//         pageService.reset().addCrumb({name: 'Reset', path: 'reset'});
//
//     }
// })();

export default class MainResetController {

    // static get $inject() {
    //     return ['toaster', '$auth', '$state'];
    // }
    //
    // constructor(toaster, $auth, $state) {
    //     this.toaster = toaster;
    //     this.$auth = $auth;
    //     this.$state = $state;
    // }
    //
    // $onInit() {
    //     this.$auth.logout();
    //
    //     this.toaster.pop({
    //         type: 'warning',
    //         body: 'Logout'
    //     });
    //
    //     this.$state.go('home');
    // }

}