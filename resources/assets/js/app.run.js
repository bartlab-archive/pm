import _ from 'lodash';

appRun.$inject = ['$rootScope', '$auth', '$transitions'];

export default function appRun($rootScope, $auth, $transitions) {
    $rootScope.isReady = false;

    // check access for state
    $transitions.onStart({}, function (trans) {
        // $rootScope.toState = toState;
        // $rootScope.toStateParams = toStateParams;
        let access = _.get(trans.$to(), 'data.access', false);

        if (access) {
            /*Cancel going to the authenticated state and go back to landing*/
            if (access === '@' && !$auth.isAuthenticated()) {
                return trans.router.stateService.target('login');
            }

            // if controller not require authorizing and has deny signed users flag then redirect
            if (access === '?' && $auth.isAuthenticated()) {
                return trans.router.stateService.target('home');
            }
        }
    });

    $rootScope.$on('authUnauthorized', function () {
        $state.go('login');
    });

    $rootScope.$on('authForbidden', function () {
        $state.go('home');
    });
}