import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 */
export default class IssuesViewActionsController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', '$mdToast', 'issuesService', '$rootScope', '$state', '$stateParams'];
    }

    $onInit() {
    }

    cancel(update) {
        return this.$mdDialog.cancel();
    }

    openIssue(id) {
        this.cancel().then(() => {
            this.$state.go('issues.info', {id: id});
        });
    }

    editIssue(id) {
        this.cancel().then(() => {
            this.$state.go('issues.edit', {id: id});
        });
    }

    watchIssue(id) {
        this.issuesService.watch(id).then(() => {
            this.selectedIssue.watch_state = true
        });
    }

    unwatchIssue(id) {
        this.issuesService.unwatch(id).then(() => {
            this.selectedIssue.watch_state = false
        });
    }

    copyIssue(id) {
        this.cancel().then(()=>{
            this.$state.go('issues.copy', {id: id});
        });
    }

    deleteIssue(id) {
        let confirm = this.$mdDialog.confirm()
            .title(`Would you like to delete this issue?`)
            .ok('Delete!')
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.issuesService.deleteIssue(id).then(() => {
                this.$rootScope.$emit('updateIssues');
            });

            this.selectedGroup = [];
        });
    }

}
