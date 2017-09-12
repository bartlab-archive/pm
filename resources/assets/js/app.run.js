import InjectableBase from 'base/injectable.base';
import _ from 'lodash';

/**
 * Class AppRun
 *
 * @property $rootScope
 * @property $auth
 * @property $transitions
 */
export default class AppRun extends InjectableBase {

    static get $inject() {
        return ['$rootScope', '$auth', '$transitions', 'Restangular', '$mdToast', '$state'];
    }

    $onInit() {
        this.isReady = false;

        this.$transitions.onStart({}, (...args) => this.checkAccess(...args));
        this.$rootScope.$on('authUnauthorized', (...args) => this.authUnauthorized(...args));
        this.$rootScope.$on('authForbidden', (...args) => this.authForbidden(...args));
        this.Restangular.setErrorInterceptor((...args) => this.errorInterceptor(...args));
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
        this.$mdToast.show(
            this.$mdToast.simple().textContent('Unauthorized')
        );
        this.$state.go('login');
    }

    authForbidden() {
        this.$mdToast.show(
            this.$mdToast.simple().textContent('Forbidden')
        );
        this.$state.go('home');
    }

    errorInterceptor(response, deferred, responseHandler) {
        console.log(response);
        switch (response.status) {
            case 401:
                this.$rootScope.$broadcast('authUnauthorized');
                break;

            case 403:
                this.$rootScope.$broadcast('authForbidden');
                break;
            case 422:
                break;

            default:
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Server error!')
                );
        }
        // return false;
    }
}