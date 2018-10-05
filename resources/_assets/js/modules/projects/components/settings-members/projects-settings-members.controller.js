import ControllerBase from 'base/controller.base';
import ProjectsMemberController from "../member/projects-member.controller";
import projectsMemberTemplate from "../member/projects-member.html";
// import projectsMemberComponent from '../member/projects-member.component';

/**
 * @property {ProjectsService} projectsService
 * @property {UsersService} usersService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {$mdDialog} $mdDialog
 * @property {$state} $state
 */
export default class ProjectsSettingsMembersController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', 'projectsService', 'usersService', '$stateParams', '$rootScope', '$mdDialog', '$state'];
    }

    static setMdDialogConfig(target, data = {}) {
        return {
            controller: ProjectsMemberController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: data,
            template: projectsMemberTemplate,
            clickOutsideToClose: true,
            openFrom: target,
            closeTo: target,
        };
    }

    $onInit() {

    }

    remove(member) {
        let confirm = this.$mdDialog.confirm()
            .title('Do you want to delete "' + member.user.full_name + '" from project members?')
            .ok('Delete')
            .cancel('Cancel');

        this.$mdDialog.show(confirm)
            .then(() => this.projectsService.deleteMember(member.id))
            .then(() => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Success delete!')//.position('bottom left')
                );
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

    edit($event, member) {
        this.$mdDialog.show(
            this.constructor.setMdDialogConfig($event.target, {
                project: this.params,
                member: member
                // selectedIssue: issue
            })
        );
    }

    add($event) {
        this.$mdDialog.show(
            this.constructor.setMdDialogConfig($event.target, {
                project: this.params
                // selectedIssue: issue
            })
        );
    }

    open(member) {
        this.$state.go('users.page.info', {id: member.user.id});
    }

}