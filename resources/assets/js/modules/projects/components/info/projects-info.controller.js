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
                this.project = response.data.data;
            });
    }

    goToUser(user) {
        if (user.is_group !== true) {
            this.$state.go('users.page.info', {id: user.id});
        }
    }

}