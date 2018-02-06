import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {$stateParams} $stateParams
 * @property {$state} $state
 */
export default class ProjectsInfoController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', '$state', '$stateParams'];
    }

    $onInit() {
        this.ProjectsService.one(this.$stateParams.project_id).get().then((response) => {
            this.project = response.data;
        });
    }

    goToUser(user) {
        this.$state.go('users.info', {id: user.id});
    }

}