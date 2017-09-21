import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 */
export default class myChangePasswordController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog'];
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
