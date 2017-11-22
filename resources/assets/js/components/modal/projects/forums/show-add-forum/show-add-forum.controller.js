import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 * @property {RolesService} RolesService
 * @property {UsersService} UsersService
 */
export default class ShowAddForumController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'ProjectsService', '$rootScope'];
    }

    $onInit() {
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    createForum() {
        this.ProjectsService.createForum(this.identifier, this.forum)
            .then(() => {
                this.$mdDialog.cancel();
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

}
