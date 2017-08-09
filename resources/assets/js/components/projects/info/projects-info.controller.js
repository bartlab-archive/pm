import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property ProjectsService
 * @property IssuesService
 * @property $stateParams
 * @property $state
 */
export default class ProjectsInfoController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', 'IssuesService', '$state', '$stateParams'];
    }

    $onInit() {
        this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
            this.project = _.get(response, 'data', []);
        });

        this.ProjectsService.getTrackers(this.$stateParams.project_id).then((response) => {
            this.bug = _.get(response, 'data.bug', 0);
            this.feature = _.get(response, 'data.feature', 0);
        });
    }
}