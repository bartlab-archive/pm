import ControllerBase from 'base/controller.base';

/**
 * @property {UsersService} UsersService
 * @property {$stateParams} $stateParams
 * @property {$state} $state
 */
export default class UsersInfoController extends ControllerBase {

    static get $inject() {
        return ['usersService', '$stateParams', '$state','authService'];
    }

    $onInit() {
        this.isAdmin = this.authService.isAdmin();
        this.loadProccess = false;
        this.user = {
            id: this.$stateParams.id
        };
        this.load();
    }

    load() {
        this.loadProccess = true;
        this.usersService
            .one(this.user.id)
            .then((response) => {
                Object.assign(this.user, response.data.data);
            })
            .finally(() => {
                this.loadProccess = false;
            });
    }

    // getMembersByRole(members) {
    //     let memberRoles = {};
    //     _.each(members, (member) => {
    //         if (memberRoles[member.role]) {
    //             memberRoles[member.role][member.user_id] = member.name;
    //         } else {
    //             memberRoles[member.role] = {};
    //             memberRoles[member.role][member.user_id] = member.name;
    //         }
    //     });
    //
    //     return memberRoles;
    // }

    // goToProject(identifier) {
    //     this.$state.go('projects.inner.settings',{project_id:identifier});
    // }
    //
    // editUser(userId){
    //     this.$state.go('users.inner.edit',{id:userId});
    // }
    //
    // getIssues(parametr, user){
    //     let params = {};
    //     params[parametr] = user;
    //     this.$state.go('issues.list',params);
    // }
}