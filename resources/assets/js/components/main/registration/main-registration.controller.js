import angular from 'angular';


export default class MainRegistrationController {
    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {

        this.$auth = $injector.get('$auth');
        this.$state = $injector.get('$state');
        this.toaster = $injector.get('$mdToast');

        this.languages = [
            {
                id: 1,
                name: 'English'
            },
            {
                id: 2,
                name: 'Spanish'
            },
            {
                id: 3,
                name: 'Ukraine'
            }
        ];
        
        this.init();
    }

    init() {
        angular.extend(this, {
            signup: {
                login: '',
                password: '',
                repeat_passw: '',
                first_name: '',
                last_name: '',
                email: ''
            }
        });
    }

    submit() {
        if (this.signup.password === this.signup.repeat_passw) {
            if (this.signup.repeat_passw === '' || this.signup.password === '') {
                this.errors = {
                    'repeat_passw': ['Repeat password is empty!'],
                    'password': ['Password is empty!']
                };
            }
            else if (this.signup.repeat_passw.length < 6) {
                this.errors = {
                    'repeat_passw': ['The password must be at least 6 characters.'],
                    'password': ['The password must be at least 6 characters.']
                };
            }
            else {
                this.$auth.signup(this.signup).then(
                    function (response) {
                        if (response.data.result) {
                            this.signup.auth_key = response.data.auth_key;
                            toaster.pop({
                                type: 'success',
                                body: "Confirmation email was sent! Run to your inbox to check it out"
                            });
                            this.signHide = false;
                            $state.go('login');
                        }
                        this.errors = response.data.errors;
                    }
                );
            }
        } else {
            this.errors = {
                'repeat_passw': ['Repeat password is wrong!']
            };
        }
    }
}

// (function () {
//     'use strict';
//
//     angular
//         .module('app.pages.main')
//         .controller('MainRegistrationController', MainRegistrationController);
//
//     /* @ngInject */
//     function MainRegistrationController($scope, $auth, $state, $stateParams, toaster, pageService, userService) {
//
//         // --- vars ---
//         if ($stateParams.email != undefined && $stateParams.email.length > 0) {
//             $scope.request = {email: $stateParams.email};
//             userService.getUserByEmail($scope.request).then(
//                 function (response) {
//                     if (response.data) {
//                         $state.go('login', {email: $stateParams.email});
//                     }
//                 })
//         }
//
//         $scope.signHide = true;
//         $scope.signup = {
//             password: '',
//             repeat_passw: '',
//             full_name: '',
//             email: $stateParams.email,
//             auth_key: '',
//             coupon: $stateParams.coupon,
//             company: $stateParams.company,
//             refer: $stateParams.refer
//         };
//         $scope.show_form = true;
//         $scope.errors = {};
//
//         // --- methods ---
//         $scope.submit = function () {
//             // if (!$stateParams.invite || $stateParams.invite != 'dfmkldsfmk03mi0f30') {
//                 // console.log($stateParams.invite);
//                 // $scope.show_form = false;
//                 // console.log($scope.show_form);
//                 // toaster.pop({type: 'error', body: "You need a valid invite code to register!"});
//                 // return false;
//             // }
//             if ($scope.signup.password == $scope.signup.repeat_passw) {
//                 if ($scope.signup.repeat_passw == '' || $scope.signup.password == '') {
//                     $scope.errors = {
//                         'repeat_passw': ['Repeat password is empty!'],
//                         'password': ['Password is empty!']
//                     };
//                 } else {
//                     $auth.signup($scope.signup).then(
//                         function (response) {
//                             if (response.data.result) {
//                                 $scope.signup.auth_key = response.data.auth_key;
//                                 toaster.pop({type: 'success', body: "Confirmation email was sent! Run to your inbox to check it out"});
//                                 $scope.signHide = false;
//                                 $state.go('login');
//                             }
//                             $scope.errors = response.data.errors;
//                         }
//                     );
//                 }
//             } else {
//                 $scope.errors = {
//                     'repeat_passw': ['Repeat password is wrong!']
//                 };
//             }
//         };
//
//         $scope.authenticate = function (social) {
//             $auth.authenticate(social).then(function (response) {
//                 if (response.data.result) {
//                     toaster.pop({type: 'success', body: "Welcome!"});
//                     // update user data
//                     userService.loadUser(true).then(function () {
//                         $state.go('home');
//                     });
//                 } else {
//                     toaster.pop({type: 'error', body: "Authorization error"});
//                 }
//             })
//                 .catch(function (response) {
//                     toaster.pop({type: 'error', body: "Authorization error"});
//                 });
//         };
//
//         // --- init ---
//
//         pageService.reset().setPageTitle(' Sign up').addCrumb({name: 'Sign up', path: 'signup'});
//
//     }
// })();