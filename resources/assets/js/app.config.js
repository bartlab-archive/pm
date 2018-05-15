import 'angular';
import InjectableBase from 'base/injectable.base';
import moment from 'moment';
import _ from 'lodash';
import HttpInterceptor from "interceptors/http.interceptor";

/**
 * @property {object} $showdownProvider
 * @property {object} $mdThemingProvider
 * @property {object} $urlRouterProvider
 * @property {object} $locationProvider
 * @property {object} RestangularProvider
 * @property {object} $mdDateLocaleProvider
 * @property {object} $stateProvider
 * @property {object} $qProvider
 * @property {object} $compileProvider
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
            '$mdDateLocaleProvider',
            '$stateProvider',
            '$qProvider',
            '$compileProvider',
            '$httpProvider'
        ];
    }

    $onInit() {
        this.urlConfig();
        this.localConfig();
        this.authConfig();
        this.restConfig();
        this.themeConfig();
        this.showdownConfig();
        this.datePickerFormat();
        this.qConfig();
        this.compileConfig();
        this.$httpConfig();
    }

    $httpConfig() {
        this.$httpProvider.interceptors.push(HttpInterceptor.inst());
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
        this.RestangularProvider.addResponseInterceptor((data, operation, what, url, response, deferred) => {
            let extractedData = data;

            // if (operation === "getList" && data.hasOwnProperty('meta')) {
            //     extractedData = data.data;
            //     extractedData.meta = data.meta;
            //     extractedData.links = data.links;
            // }

            if (data && data.data) {
                extractedData = data.data;
                Object
                    .keys(data)
                    .filter((value) => {
                        return value !== 'data';
                    })
                    .reduce((obj, key) => {
                        extractedData[key] = data[key];
                        return obj;
                    }, {});
            }

            return extractedData;
        });
    }

    showdownConfig() {
        this.$showdownProvider
            .setOption('simpleLineBreaks', true)
            .setOption('simplifiedAutoLink', true)
            .setOption('excludeTrailingPunctuationFromURLs', true)
            // .setOption('noHeaderId', true)
            .setOption('ghCompatibleHeaderId', true)
            .setOption('strikethrough', true)
            .setOption('ghCodeBlocks', true)
            .setOption('tasklists', true)
            // .setOption('underline', true)
            .setOption('parseImgDimension', true);
        // .setOption('ghMentions', true)
        // .setOption('ghMentionsLink', '/');

        // lagacy convert <H> tag
        this.$showdownProvider.loadExtension({
            type: 'lang',
            regex: /(h([1-6])\.)/g,
            replace: (...args) => {
                return _.padEnd('', +args[2], '#');
            }
        });
    }

    datePickerFormat() {
        this.$mdDateLocaleProvider.formatDate = function (date) {
            return date ? moment(date).format('YYYY-MM-DD') : '';
        };
    }

    qConfig() {
        this.$qProvider.errorOnUnhandledRejections(false);
    }

    compileConfig() {
        // improve performance
        this.$compileProvider.debugInfoEnabled(process.env.NODE_ENV === 'development');
        this.$compileProvider.commentDirectivesEnabled(false);
        this.$compileProvider.cssClassDirectivesEnabled(false);
    }
}