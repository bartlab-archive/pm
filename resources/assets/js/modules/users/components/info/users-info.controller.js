import ControllerBase from 'base/controller.base';

/**
 * @property {UsersService} UsersService
 * @property {$stateParams} $stateParams
 * @property {$state} $state
 */
export default class UsersInfoController extends ControllerBase {

    static get $inject() {
        return ['usersService', '$stateParams','$state', 'projectsService','issuesService'];
    }

    $onInit() {
        this.usersService.one(this.$stateParams.id).then((response) => {
            this.user = _.get(response, 'data', []);
            this.projects = this.user.projects;
            this.members = this.usersService.getMembersList(this.user);
            //this.issues = this.user.issues;
            this.membersByRole = this.getMembersByRole(this.members);
            this.issues = this.usersService.getCountIssues(this.user);

        });
    }

    getMembersByRole(members) {
        let memberRoles = {};
        _.each(members, (member) => {
            if (memberRoles[member.role]) {
                memberRoles[member.role][member.user_id] = member.name;
            } else {
                memberRoles[member.role] = {};
                memberRoles[member.role][member.user_id] = member.name;
            }
        });

        return memberRoles;
    }

    goToProject(identifier) {
        this.$state.go('projects.inner.settings',{project_id:identifier});
    }

    editUser(userId){
        this.$state.go('users.inner.edit',{id:userId});
    }

    getIssues(parametr, user){
        let params = {};
        params[parametr] = user;
        this.$state.go('issues.list',params);
    }
}