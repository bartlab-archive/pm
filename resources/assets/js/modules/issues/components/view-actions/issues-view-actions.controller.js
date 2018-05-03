import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} projectsService
 * @property {$rootScope} $rootScope
 * @property {$state} $state
 */
export default class IssuesViewActionsController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'issuesService', '$rootScope', '$state', 'projectsService'];
    }

    $onInit() {
    }

    cancel(update) {
        return this.$mdDialog.cancel();
    }

    openIssue(id) {
        this.cancel()
            .then(() => {
                this.$state.go('issues.info', {id});
            });
    }

    editIssue(id) {
        this.$state.go('issues.edit', {id});
        this.cancel();
    }

    watchIssue(id) {
        this.issuesService.watch(id)
            .then(() => {
                this.selectedIssue.watch_state = true
            });
    }

    unwatchIssue(id) {
        this.issuesService.unwatch(id)
            .then(() => {
                this.selectedIssue.watch_state = false
            });
    }

    copyIssue(issue) {
        this.$state.go('issues-inner.copy', {
            id: issue.id,
            project_id: issue.project.identifier
        });
        this.cancel();
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
