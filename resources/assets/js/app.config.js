import 'angular';
import InjectableBase from 'base/injectable.base';

/**
 * Class AppConfig
 *
 * @property $rootScope
 * @property $stateProvider
 * @property $urlRouterProvider
 * @property $locationProvider
 * @property $authProvider
 * @property $mdThemingProvider
 * @property RestangularProvider
 * @property $showdownProvider
 */
export default class AppConfig extends InjectableBase {

    static get $inject() {
        return ['$showdownProvider', '$mdThemingProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', 'RestangularProvider', 'ScrollBarProvider'];
    }

    $onInit() {
        this.urlConfig();
        this.localConfig();
        this.authConfig();
        this.restConfig();
        this.themeConfig();
        this.showdownConfig();
        this.scrollBarConfig();
    }

    themeConfig() {
        this.$mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('deep-orange');
        // .warnPalette('red');

        this.$mdThemingProvider.enableBrowserColor({
            // theme: 'myTheme', // Default is 'default'
            // palette: 'accent', // Default is 'primary', any basic material palette and extended palettes are available
            // hue: '200' // Default is '800'
        });
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
    }

    showdownConfig() {
        this.$showdownProvider.setOption('simpleLineBreaks', true);
        this.$showdownProvider.setOption('simplifiedAutoLink', true);
        this.$showdownProvider.setOption('noHeaderId', true);
        this.$showdownProvider.setOption('strikethrough', true);
        this.$showdownProvider.setOption('ghCodeBlocks', true);
        this.$showdownProvider.setOption('tasklists', true);
        this.$showdownProvider.setOption('parseImgDimension', true);
        this.$showdownProvider.setOption('ghMentions', true);
        this.$showdownProvider.setOption('ghMentionsLink', '/');
    }

    scrollBarConfig() {
        this.ScrollBarProvider.setConfig({
            autoHideScrollbar: false,
            setHeight: 650,
            scrollInertia: 500,
            axis: 'y',
            advanced: {
                updateOnContentResize: true
            },
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            },
            theme: 'dark'
        });
    }
}