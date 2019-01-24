import ControllerBase from 'base/controller.base';

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
        this.title = this.selectedIssue.subject;
        // this.title = this.selectedIssue.tracker.name + ' #' + this.selectedIssue.id + ': ' + this.selectedIssue.subject;
    }

    cancel(update) {
        this.$mdDialog.cancel();
    }
}
