import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {$state} $state
 * @property {$window} $window
 * @property {IssuesService} IssuesService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {UsersService} UsersService
 */
export default class IssuesInfoController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$state', '$stateParams', '$window', 'ProjectsService', '$rootScope', 'UsersService', '$mdDialog'];
    }

    $onInit() {
        this.IssuesService.all().one(this.$stateParams.id).get()
            .then((response) => {
                this.$stateParams.project_id = response.data.project.identifier;
                this.issue = response.data;
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

}