import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 */
export default class IssuesViewActionsController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', '$mdToast', 'IssuesService', '$rootScope', '$state', '$stateParams'];
    }

    $onInit() {
    }

    cancel(update) {
        return this.$mdDialog.cancel();
    }

    openIssue(id) {
        this.cancel().then(() => {
            this.$state.go('issues.info', {project_id: this.$stateParams.project_id, id: id});
        });
    }

    editIssue(id) {
        this.cancel().then(() => {
            this.$state.go('issues.edit', {project_id: this.$stateParams.project_id, id: id});
        });
    }

    watchIssue(id) {
        this.IssuesService.watch(id).then(() => {
            this.selectedIssue.watch_state = true
        });
    }

    unwatchIssue(id) {
        this.IssuesService.unwatch(id).then(() => {
            this.selectedIssue.watch_state = false
        });
    }

    copyIssue(id) {
        this.cancel().then(()=>{
            this.$state.go('issues.copy', {project_id: this.$stateParams.project_id, id: id});
        });
    }

    deleteIssue(id) {
        let confirm = this.$mdDialog.confirm()
            .title(`Would you like to delete this issue?`)
            .ok('Delete!')
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.IssuesService.deleteIssue(id).then(() => {
                this.$rootScope.$emit('updateIssues');
            });

            this.selectedGroup = [];
        });
    }

}
