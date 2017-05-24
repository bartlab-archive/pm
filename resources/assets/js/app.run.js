appRun.$inject = ['$rootScope'];

export default function appRun($rootScope) {
    $rootScope.isReady = false;

    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;

        if (!$rootScope.isReady) {
            event.preventDefault();
            return false;
        }

        if (toState.data && toState.data.access) {
            /*Cancel going to the authenticated state and go back to landing*/
            if (toState.data.access === '@' && !$auth.isAuthenticated()) {
                event.preventDefault();
                return $state.go('login');
            }

            // if controller not require authorizing and has deny signed users flag then redirect
            if (toState.data.access === '?' && $auth.isAuthenticated()) {
                event.preventDefault();
                return $state.go('home');
            }

            // if (toState.data.access === 'admin' && !userService.isAdmin()) {
            //     event.preventDefault();
            //     return $state.go('home');
            // }
        }
    });
}