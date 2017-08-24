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

        this.ProjectsService.getTrackers(this.$stateParams.project_id).then((response) => {
            this.bug = _.get(response, 'data.bug', 0);
            this.feature = _.get(response, 'data.feature', 0);
        });
    }

    canShowModule(moduleName) {
        return (this.project && typeof this.project.modules[moduleName] !== 'undefined');
    }
}