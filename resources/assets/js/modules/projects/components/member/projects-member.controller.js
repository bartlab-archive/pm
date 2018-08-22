import ControllerBase from 'base/controller.base';
import ProjectsService from "../../services/projects.service";

// todo: add server validation to form
// todo: add loadProgress

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
        return ['$mdToast', '$q', '$mdDialog', '$rootScope', 'rolesService', 'usersService', 'projectsService', 'USER_STATUS_ACTIVE'];
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

        this.usersService
            .all({
                // todo: make type as global const, like user status
                type: 'all',
                status: [this.USER_STATUS_ACTIVE]
            })
            .then((response) => {
                this.users = response.data.data.filter(
                    (user) => !this.project.members.some(
                        (member) => member.user.id === user.id
                    )
                );
            });
    }

    cancel() {
        this.$mdDialog.cancel();

        // if (update) {
        //     this.$mdToast.show(
        //         this.$mdToast.simple().textContent('Success saved!')
        //     );
        //     this.$rootScope.$emit('updateProjectInfo');
        // }
    }

    submit() {
        let promise;

        if (!this.model.id) {
            promise = this.projectsService
                .addMember(this.projectsService.getCurrentId(), this.model.user, this.model.roles);
            // .then(() => this.cancel(true));
        } else {
            promise = this.projectsService
                .updateMember(this.member.id, this.model.roles);
            // .then(() => this.cancel(true));
        }

        promise
            .then(() => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Success saved!')
                );
                this.$rootScope.$emit('updateProjectInfo');
                // this.$mdDialog.cancel();
                this.cancel()
            })
            .catch(() => {
                // todo: show server error
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Error add member')
                );
            });
    }

}
