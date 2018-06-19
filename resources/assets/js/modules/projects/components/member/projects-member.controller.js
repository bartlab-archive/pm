import ControllerBase from 'base/controller.base';
import ProjectsService from "../../services/projects.service";

/**
 * @property project
 * @property member
 *
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} projectsService
 * @property {$rootScope} $rootScope
 * @property {RolesService} rolesService
 * @property {UsersService} usersService
 */
export default class ProjectsMemberController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', '$q', '$mdDialog', '$rootScope', 'rolesService', 'usersService', 'projectsService'];
    }

    $onInit() {
        this.model = {
            id: this.member ? this.member.id : null,
            user: this.member ? this.member.user.id : null,
            roles: this.member ? this.member.roles.map((role) => role.id) : []
        };

        this.rolesService.all().then((response) => {
            this.roles = response.data.data;
        });

        this.usersService.all().then((response) => {
            this.users = response.data.data.filter(
                (user) => !this.project.members.some(
                    (member) => member.user.id === user.id
                )
            );
        });
    }

    cancel(update) {
        this.$mdDialog.cancel();

        if (update) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Success saved!')//.position('bottom left')
            );
            this.$rootScope.$emit('updateProjectInfo');
        }
    }

    submit() {
        // console.log(this.model.roles);
        if (!this.model.id) {
            this.projectsService
                .addMember(this.projectsService.getCurrentId(), this.model.user, this.model.roles)
                .then(() => this.cancel(true));
        } else {
            this.projectsService
                .updateMember(this.member.id, this.model.roles)
                .then(() => this.cancel(true));
        }
    }

}
