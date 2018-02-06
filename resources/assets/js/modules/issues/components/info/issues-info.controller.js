import ControllerBase from 'base/controller.base';

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
        return ['IssuesService', '$stateParams', '$rootScope', 'ProjectsService'];
    }

    $onInit() {
        this.IssuesService.one(this.$stateParams.id).get()
            .then((response) => {
                this.issue = response.data;
                this.ProjectsService.setCurrentId(response.data.project.identifier);
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

}