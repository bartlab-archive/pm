import DI from 'common/di';

export default class MainIndexController extends DI {

    // static get $inject() {
    //     return ['$scope'];
    // }

    init() {
        console.log('MainIndexController', this);

        // this.$scope.err
    }
}