import 'angular';
import InjectableBase from 'base/injectable.base';
import moment from 'moment';

/**
 * @property {object} $urlRouterProvider
 * @property {object} $locationProvider
 * @property {object} $authProvider
 * @property {object} $mdThemingProvider
 * @property {object} RestangularProvider
 * @property {object} $showdownProvider
 * @property {object} ScrollBarsProvider
 * @property {object} $mdDateLocaleProvider
 * @property {object} $stateProvider
 */
export default class AppConfig extends InjectableBase {

    static get $inject() {
        return [
            '$showdownProvider',
            '$mdThemingProvider',
            '$urlRouterProvider',
            '$locationProvider',
            '$authProvider',
            'RestangularProvider',
            'ScrollBarsProvider',
            '$mdDateLocaleProvider',
            '$stateProvider',
        ];
    }

    $onInit() {
        this.urlConfig();
        this.localConfig();
        this.authConfig();
        this.restConfig();
        this.themeConfig();
        this.showdownConfig();
        this.scrollBarConfig();
        this.datePickerFormat();
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
        this.ScrollBarsProvider.defaults = {
            autoHideScrollbar: false,
            setHeight: 200,
            scrollInertia: 500,
            axis: 'y',
            advanced: {
                updateOnContentResize: true
            },
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            },
            theme: 'minimal-dark'
        };
    }

    datePickerFormat() {
        this.$mdDateLocaleProvider.formatDate = function (date) {
            return date ? moment(date).format('YYYY-MM-DD') : '';
        };
    }

}