import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property ProjectsService
 * @property $stateParams
 */
export default class ProjectsInfoController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', '$stateParams'];
    }

    $onInit() {
        this.ProjectsService.one(this.$stateParams.id).then((response) => {
            this.project = _.get(response, 'data', []);
        });
    }

}