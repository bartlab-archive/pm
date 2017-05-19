import DI from 'common/di';

export default class LayoutDefaultController extends DI {

    // static get $inject() {
    //     return ['$rootScope', '$http'];
    // }

    init() {
        console.log('LayoutDefaultController', this);
    }
}