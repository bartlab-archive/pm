import ControllerBase from 'base/controller.base';
/**
 * @property {$mdDialog} $mdDialog
 * @property {$state} $state
 * @property {Object} ProjectsService
 * @property {$showdown} $showdown
 * @property {$rootScope} $rootScope
 */
export default class AdminProjectsController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog','$state','ProjectsService','$showdown', '$rootScope', '$stateParams'];
    }

    cancel(update) {
        this.$mdDialog.cancel();
    }

    $onInit() {
        this.load();
        this.$rootScope.$on('updateProjects', () => this.load());
    }

    load() {

        this.ProjectsService.getList().then((response)=>{
            this.projects = response.data;
        });
        this.statuses =  {0:'All', 1:'Open',5:'Close', 9:'Archive'};
    }

    goToProject(identifier) {
        this.$state.go('projects.inner.settings',{project_id:identifier});
    }

    makeHtml(text) {
        return text ? this.$showdown.stripHtml(this.$showdown.makeHtml(text)) : '';
    }

    deleteProject(identifier) {
        let confirm = this.$mdDialog.confirm()
        .title(`Would you like to delete this project?`)
        .ok('Delete!')
        .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.ProjectsService.deleteProject(identifier).then(() => {
            this.$rootScope.$emit('updateProjects');
          });
        });
    }

    archiveProject(identifier,status) {
        let confirm = this.$mdDialog.confirm()
          .title(status == '9' ? 'Would you like to unarchive this project?':'Would you like to archive this project?' )
          .ok( status == '9' ?'unarchive':'archive' )
          .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
                if (status == 9) {
                    status = 1;
                } else {
                    status = 9;
                }
                this.ProjectsService.updateProjectStatus(identifier, {'status': status}).then((response) => {
                this.$rootScope.$emit('updateProjects');
            });
        });
        this.clearFilters();
    }

    copyProject(identifier) {
        this.$state.go('projects.inner.copy',{project_id:identifier});
    }

    sortBy() {
        this.ProjectsService.getList({closed: this.filterForm.myOption}).then((response) => {
          this.projects = response.data;
        });
    }

    search() {
      // this.ProjectsService.getSearchList({name: this.filterForm.text}).then((response) => {
      //   this.projects = response.data || {};
      // });
    }

    clearFilters() {
        this.filterForm.myOption = 0;
        this.filterForm.text = '';
        this.$rootScope.$emit('updateProjects');
    }
}