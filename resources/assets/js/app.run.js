import Injectable from 'base/injectable';
import _ from 'lodash';

/**
 * Class AppRun
 *
 * @property $rootScope
 * @property $auth
 * @property $transitions
 */
export default class AppRun extends Injectable {

    static get $inject() {
        return ['$rootScope', '$auth', '$transitions'];
    }

    $onInit() {
        this.isReady = false;

        this.$transitions.onStart({}, (...args) => this.checkAccess(...args));
        this.$rootScope.$on('authUnauthorized', this.authUnauthorized);
        this.$rootScope.$on('authForbidden', this.authForbidden);
    }

    checkAccess(trans) {
        const access = _.get(trans.$to(), 'data.access', false);

        if (access) {
            /*Cancel going to the authenticated state and go back to landing*/
            if (access === '@' && !this.$auth.isAuthenticated()) {
                return trans.router.stateService.target('login');
            }

            // if controller not require authorizing and has deny signed users flag then redirect
            if (access === '?' && this.$auth.isAuthenticated()) {
                return trans.router.stateService.target('home');
            }
        }
    }

    authUnauthorized() {
        this.$state.go('login');
    }

    authForbidden() {
        this.$state.go('home');
    }
}