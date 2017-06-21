import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property ProjectsService
 * @property $stateParams
 * @property $state
 */
export default class ProjectsInfoController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', '$state', '$stateParams'];
    }

    $onInit() {
        this.ProjectsService.one(this.$stateParams.id).then((response) => {
            this.project = _.get(response, 'data', []);
        });
    }

    viewAllIssues() {
        this.$state.go('projects-inner.issues.index');
    }

    calendar() {
        this.$state.go('projects-inner.issues.calendar');
    }

    gantt() {
        this.$state.go('projects-inner.issues.gantt');
    }

    viewAllNews() {
        this.$state.go('projects-inner.news');
    }
}