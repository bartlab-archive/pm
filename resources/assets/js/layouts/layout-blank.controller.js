import DI from 'common/di';

export default class LayoutBlankController extends DI {

    // static get $inject() {
    //     return ['$rootScope', '$http'];
    // }

    init() {
        console.log('LayoutBlankController', this);
    }
}