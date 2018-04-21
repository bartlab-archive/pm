import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {$stateParams} $stateParams
 * @property {$state} $state
 */
export default class ProjectsInfoController extends ControllerBase {

    static get $inject() {
        return ['projectsService', '$state', '$stateParams'];
    }

    $onInit() {
        this.projectsService
            .one(this.projectsService.getCurrentId())
            .then((response) => {
                this.project = response.data;
            });
    }

    goToUser(user) {
        this.$state.go('users.info', {id: user.id});
    }

}