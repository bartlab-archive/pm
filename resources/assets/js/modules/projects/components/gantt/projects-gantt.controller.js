import ControllerBase from 'base/controller.base';

export default class ProjectsGanttController extends ControllerBase {

    static get $inject() {
        return ['$state','StatusesService','IssuesService','$stateParams'];
    }


    $onInit() {
        this.loadProjectIsues();
    }

    loadProjectIsues(){
        console.log(this.$stateParams);
        // this.ProjectsService.getProjectIssues(this.$stateParams.project_id).then((response) => {
        //     this.issuesCount = _.get(response, 'data.trackers', []);
        //
        // });
    }
}