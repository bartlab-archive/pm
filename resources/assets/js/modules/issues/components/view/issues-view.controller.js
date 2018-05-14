import ControllerBase from 'base/controller.base';
// import moment from 'moment';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 */
export default class IssuesViewController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog'];
    }

    $onInit() {
        // todo: add tooltip for icons in left side
    }

    cancel() {
        return this.$mdDialog.cancel();
    }
}
