import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 */
export default class ProjectsWikiPreviewController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog'];
    }

    cancel() {
        this.$mdDialog.cancel();
    }

}
