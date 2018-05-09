import _ from 'lodash';
import InjectableBase from 'base/injectable.base';

/**
 * Class AppRun
 *
 * @property $rootScope
 * @property $auth
 * @property $transitions
 */
export default class AppRun extends InjectableBase {

    static get $inject() {
        return ['$rootScope', '$auth', '$transitions', 'Restangular', '$mdToast', '$state', '$http'];
    }

    $onInit() {
        this.isReady = false;

        this.$transitions.onStart({}, (...args) => this.checkAccess(...args));
        this.$rootScope.$on('authUnauthorized', (...args) => this.authUnauthorized(...args));
        this.$rootScope.$on('authForbidden', (...args) => this.authForbidden(...args));
        this.$rootScope.$on('notFound', (...args) => this.notFound(...args));
        this.$rootScope.$on('notAllowed', (...args) => this.notAllowed(...args));
        this.$rootScope.$on('serverError', (...args) => this.serverError(...args));
        this.$rootScope.$on('tooManyRequests', (...args) => this.tooManyRequests(...args));
        this.Restangular.setErrorInterceptor((...args) => this.errorInterceptor(...args));
    }

    checkAccess(trans) {
        // console.log(trans.router.stateService.href(trans.to(), trans.params(),{absolute: true}));
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

    notFound() {
        this.$mdToast.show(
            this.$mdToast.simple().textContent('Not found')
        );

        this.$state.go('404');
    }

    notAllowed(){
        this.$mdToast.show(
            this.$mdToast.simple().textContent('Method Not Allowed')
        );
    }

    tooManyRequests(){
        this.$mdToast.show(
            this.$mdToast.simple().textContent('Too Many Requests!')
        );
    }

    serverError(){
        this.$mdToast.show(
            this.$mdToast.simple().textContent('Server error!')
        );
    }

    errorInterceptor(response, deferred, responseHandler) {
        switch (true) {
            case (response.status === 401):
                this.$rootScope.$broadcast('authUnauthorized');
                break;

            case (response.status === 403):
                this.$rootScope.$broadcast('authForbidden');
                break;

            case (response.status === 404):
                this.$rootScope.$broadcast('notFound');
                break;

            case (response.status >= 500):
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Server error!')
                );
        }
    }

}