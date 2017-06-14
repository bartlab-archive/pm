import ControllerBase from 'base/controller.base';

export default class myChangePasswordController extends ControllerBase {

  static get $inject() {
    return ['$mdDialog'];
  }

  cancel() {
    this.$mdDialog.cancel();
  }
}
