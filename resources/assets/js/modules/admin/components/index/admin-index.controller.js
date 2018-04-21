import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 * @property {Object} MainService
 */
export default class AdminIndexController extends ControllerBase {

    static get $inject() {
        return ['$state', 'mainService'];
    }

    $onInit() {
        this.list = this.mainService.getAdminMenu();
    }

    goto(url) {
        this.$state.go(url);
    }

}