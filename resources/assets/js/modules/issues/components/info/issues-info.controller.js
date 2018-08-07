import ControllerBase from 'base/controller.base';

/**
 * @property {$state} $state
 * @property {CategoriesService} issuesService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {ProjectsService} projectsService
 */
export default class IssuesInfoController extends ControllerBase {

    static get $inject() {
        return ['issuesService', '$stateParams', '$rootScope', 'projectsService', '$state', '$mdDialog'];
    }

    $onInit() {
        // todo: show parent issue info
        // todo: show crated/updated info
        // todo: markdown for h1-h5 tags
        this.load();
        this.$rootScope.$on('deldeteIssues', () => this.$state.go('issues-inner.list', {project_id: this.projectsService.getCurrentId()}));
    }

    load() {
        this.loadProccess = true;
        this.issuesService
            .one(this.$stateParams.id)
            .then((response) => {
                this.issue = response.data.data;
                this.projectsService.setCurrentId(this.issue.project.identifier);
                this.$rootScope.$emit('updateProjectInfo');
                this.loadProccess = false;
            });
    }

    // openList() {
    //     this.$state.go('issues-inner.list', {project_id: this.projectsService.getCurrentId()});
    // }
    //
    // openImports() {
    //     this.$state.go('issues.imports');
    // }
    //
    // openReport() {
    //     this.$state.go('issues-inner.report', {project_id: this.projectsService.getCurrentId()});
    // }

    watch() {
        if (this.issue.is_watcheble) {
            this.issuesService.unwatch(this.issue.id)
                .then(() => {
                    this.issue.is_watcheble = false
                });
        } else {
            this.issuesService.watch(this.issue.id)
                .then(() => {
                    this.issue.is_watcheble = true
                });
        }
        // this.issuesService.watch(this.issue.id)
        //     .then(() => {
        //         this.issue.is_watcheble = true
        //     });
    }

    // unwatch() {
    //     this.issuesService.unwatch(this.issue.id)
    //         .then(() => {
    //             this.issue.is_watcheble = false
    //         });
    // }

    // copyIssue() {
    //     this.$state.go('issues-inner.copy', {
    //         id: this.issue.id,
    //         project_id: this.issue.project.identifier
    //     });
    //     this.cancel();
    // }

    remove() {
        let confirm = this.$mdDialog.confirm()
            .title(`Would you like to delete this issue?`)
            .ok('Delete!')
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.issuesService.remove(this.issue.id).then(() => {
                // this.$state.go('issues-inner.list',{});

                // this.$rootScope.$emit('updateIssues');
                this.$rootScope.$emit('deldeteIssue');
            });

            this.selectedGroup = [];
        });
    }

}