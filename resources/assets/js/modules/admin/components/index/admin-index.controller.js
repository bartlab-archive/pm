import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 * @property {Object} MainService
 */
export default class AdminIndexController extends ControllerBase {

    static get $inject() {
        return ['$state', 'MainService'];
    }

    $onInit() {
        this.list = this.MainService.getAdminMenu();
    }

    goto(url) {
        this.$state.go(url);
    }

}