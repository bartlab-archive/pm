import ControllerBase from 'base/controller.base';

export default class myAddMailController extends ControllerBase {
  static get $inject() {
    return ['$mdDialog'];
  }

  cancel() {
    this.$mdDialog.cancel();
  }
}