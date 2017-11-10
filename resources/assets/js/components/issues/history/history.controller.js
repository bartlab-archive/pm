import ControllerBase from 'base/controller.base';
import _ from "lodash";
import moment from 'moment';

/**
 * @property {$state} $state
 * @property {$window} $window
 * @property {IssuesService} IssuesService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 */
export default class HistoryController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$state', '$stateParams', '$window', 'ProjectsService','$rootScope'];
    }

    $onInit() {
        this.IssuesService.getHistory(this.issueId).then((response) => {
            this.history = _.keyBy(response.data, 'id');
        });

        this.IssuesService.one(this.issueId).then((response) => {
            _.set(
                this.$stateParams,
                'project_id',
                _.get(response, 'data.project.identifier')
            );
        });
    }

    convertDate(date){
        return moment(date).format('DD/MM/YYYY')
    }
}