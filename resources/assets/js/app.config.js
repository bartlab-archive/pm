appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider'];

export default function appConfig($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
    // set default routes when no path specified
    $urlRouterProvider.when('', '/');
    // always goto 404 if route not found
    $urlRouterProvider.otherwise('/404');

    $locationProvider.html5Mode(true);

    $authProvider.loginUrl = '/api/v1/auth';
    $authProvider.signupUrl = '/api/v1/register';
    $authProvider.tokenRoot = 'data';//compensates success response macro
    $authProvider.withCredentials = false;
    $authProvider.baseUrl = '/';
    $authProvider.unlinkUrl = '/api/v1/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = '';
    $authProvider.tokenHeader = 'Authorization';
    $authProvider.tokenType = 'Bearer';
    $authProvider.storageType = 'localStorage';
}