import InjectableBase from 'base/injectable.base';

/**
 * Class AppConfig
 *
 * @property $rootScope
 * @property $stateProvider
 * @property $urlRouterProvider
 * @property $locationProvider
 * @property $authProvider
 * @property RestangularProvider
 */
export default class AppConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', 'RestangularProvider'];
    }

    $onInit() {
        this.urlConfig();
        this.localConfig();
        this.authConfig();
        this.restConfig();
    }

    urlConfig() {
        // set default routes when no path specified
        this.$urlRouterProvider.when('', '/');
        // always goto 404 if route not found
        this.$urlRouterProvider.otherwise('/404');
    }

    localConfig() {
        // use HTML5 mode for url
        this.$locationProvider.html5Mode(true);
    }

    authConfig() {
        this.$authProvider.loginUrl = '/api/v1/auth';
        this.$authProvider.signupUrl = '/api/v1/register';
        this.$authProvider.getUserInfo = '/api/v1/user-info';
        this.$authProvider.tokenRoot = 'data';//compensates success response macro
        this.$authProvider.withCredentials = false;
        this.$authProvider.baseUrl = '/';
        this.$authProvider.unlinkUrl = '/api/v1/auth/unlink/';
        this.$authProvider.tokenName = 'token';
        this.$authProvider.tokenPrefix = '';
        this.$authProvider.tokenHeader = 'Authorization';
        this.$authProvider.tokenType = 'Bearer';
        this.$authProvider.storageType = 'localStorage';
    }

    restConfig() {
        this.RestangularProvider.setBaseUrl('/api/v1');
        this.RestangularProvider.setDefaultHeaders({
            'Content-Type': 'application/json'
        });
        this.RestangularProvider.setFullResponse(true);
        this.RestangularProvider.setErrorInterceptor((...args) => this.errorInterceptor(...args));
    }

    errorInterceptor(response, deferred, responseHandler) {
        switch (response.status) {
            case 401:
                console.log('401');
                // this.$rootScope.$broadcast('authUnauthorized');
                break;

            case 403:
                console.log('403');
                // this.$rootScope.$broadcast('authForbidden');
                break;

            default:
                // this.$rootScope.$broadcast('serverError');
                console.log(response.statusText || 'Server error');
            // toaster.show(
            //     toaster.simple()
            //         .textContent(response.statusText || 'Server error')
            // );
        }

        // return false;
    }
}