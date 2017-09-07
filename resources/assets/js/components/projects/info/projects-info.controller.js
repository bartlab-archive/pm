import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {IssuesService} IssuesService
 * @property {$stateParams} $stateParams
 * @property {$state} $state
 */
export default class ProjectsInfoController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', 'IssuesService', '$state', '$stateParams'];
    }

    $onInit() {
        this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
            this.project = _.get(response, 'data', []);
            this.project.modules = this.ProjectsService.getModules(this.project.enabled_modules);
        });

        this.ProjectsService.getProjectIssues(this.$stateParams.project_id).then((response) => {
            this.issuesCount = _.get(response, 'data.trackers', []);
            _.each(this.issuesCount, (v, k) => {
                !v.opened ? v.opened = 0 : null;
                !v.closed ? v.closed = 0 : null;
            });
        });
    }

    canShowModule(moduleName) {
        return (this.project && typeof this.project.modules[moduleName] !== 'undefined');
    }
}