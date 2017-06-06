appConfig.$inject = ['$rootScope', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', 'RestangularProvider'];

export default function appConfig($rootScope, $stateProvider, $urlRouterProvider, $locationProvider, $authProvider, RestangularProvider) {
    // set default routes when no path specified
    $urlRouterProvider.when('', '/');
    // always goto 404 if route not found
    $urlRouterProvider.otherwise('/404');

    $locationProvider.html5Mode(true);

    $authProvider.loginUrl = '/api/v1/auth';
    $authProvider.signupUrl = '/api/v1/register';
    $authProvider.getUserInfo = '/api/v1/user-info';
    $authProvider.tokenRoot = 'data';//compensates success response macro
    $authProvider.withCredentials = false;
    $authProvider.baseUrl = '/';
    $authProvider.unlinkUrl = '/api/v1/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = '';
    $authProvider.tokenHeader = 'Authorization';
    $authProvider.tokenType = 'Bearer';
    $authProvider.storageType = 'localStorage';

    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json'
    });
    RestangularProvider.setFullResponse(true);
    RestangularProvider.setErrorInterceptor(function (response, deferred, responseHandler) {
        switch (response.status) {
            case 401:
                $rootScope.$broadcast('authUnauthorized');
                break;

            case 403:
                $rootScope.$broadcast('authForbidden');
                break;

            default:
                console.log(response.statusText || 'Server error');
                // toaster.show(
                //     toaster.simple()
                //         .textContent(response.statusText || 'Server error')
                // );
        }

        // return false;
    });
}