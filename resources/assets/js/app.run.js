import DI from 'common/di';

/**
 * @property $rootScope
 */
export default class AppRun extends DI {

    static get $inject() {
        return ['$rootScope', '$http'];
    }

    init() {
        console.log('AppRun', this);
    }
}