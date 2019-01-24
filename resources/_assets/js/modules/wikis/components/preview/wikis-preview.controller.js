import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 */
export default class WikisPreviewController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog'];
    }

    cancel() {
        this.$mdDialog.cancel();
    }

}
