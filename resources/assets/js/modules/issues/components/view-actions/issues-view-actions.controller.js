import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {$rootScope} $rootScope
 * @property {$state} $state
 * @property {object} issue
 */
export default class IssuesViewActionsController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'issuesService', '$rootScope', '$state'];
    }

    $onInit() {
    }

    cancel() {
        return this.$mdDialog.cancel();
    }

    // openIssue() {
    //     // console.log($event);
    //     this.cancel()
    //         .then(() => {
    //             this.$state.go('issues.info', {id: this.issue.id});
    //         });
    // }
    //
    // editIssue() {
    //     this.$state.go('issues.edit', {id: this.issue.id});
    //     this.cancel();
    // }

    watch() {
        this.issuesService.watch(this.issue.id)
            .then(() => {
                this.issue.is_watcheble = true
            });
    }

    unwatch() {
        this.issuesService.unwatch(this.issue.id)
            .then(() => {
                this.issue.is_watcheble = false
            });
    }

    // copyIssue() {
    //     this.$state.go('issues-inner.copy', {
    //         id: this.issue.id,
    //         project_id: this.issue.project.identifier
    //     });
    //     this.cancel();
    // }

    deleteIssue() {
        let confirm = this.$mdDialog.confirm()
            .title(`Would you like to delete this issue?`)
            .ok('Delete!')
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.issuesService.deleteIssue(this.issue.id).then(() => {
                this.$rootScope.$emit('updateIssues');
            });

            this.selectedGroup = [];
        });
    }

}
