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
        return ['issuesService', '$stateParams', '$rootScope', 'projectsService'];
    }

    $onInit() {
        this.issuesService.one(this.$stateParams.id)
            .then((response) => {
                this.issue = response.data.data;
                this.projectsService.setCurrentId(this.issue.project.identifier);
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

}