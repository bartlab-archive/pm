import ControllerBase from 'base/controller.base';
// import projectsMemberComponent from '../member/projects-member.component';

/**
 * @property {ProjectsService} ProjectsService
 * @property {UsersService} UsersService
 * @property {EnumerationsService} EnumerationsService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {$mdDialog} $mdDialog
 * @property {$state} $state
 */
export default class ProjectsSettingsMembersController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', 'ProjectsService', 'UsersService', 'EnumerationsService', '$stateParams', '$rootScope', '$mdDialog', '$state'];
    }

    $onInit() {

    }


    setMdDialogConfig(component, target, data = {}) {
        // let ctrlConfig = [].concat(
        //     component.controller.$inject || [],
        //     [(...args) => {
        //         let ctrl = new component.controller(...args);
        //
        //         // decorator
        //         _.each(data, (v, k) => {
        //             ctrl[k] = v;
        //         });
        //
        //         ctrl.$onInit && ctrl.$onInit();
        //         return ctrl;
        //     }]
        // );
        //
        // return {
        //     controller: ctrlConfig,
        //     controllerAs: '$ctrl',
        //     template: component.template,
        //     //panelClass: 'modal-custom-dialog',
        //     parent: angular.element(document.body),
        //     trapFocus: true,
        //     clickOutsideToClose: true,
        //     clickEscapeToClose: true,
        //     escapeToClose: true,
        //     hasBackdrop: true,
        //     disableParentScroll: true,
        //     openFrom: target,
        //     closeTo: target,
        // }

        // this.$mdDialog.show(

        // current project identifier
        data.identifier = this.model.identifier;

        return {
            controller: component.controller,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: data,
            template: component.template,
            clickOutsideToClose: true,
            openFrom: target,
            closeTo: target,
        };
        // );
    }

    deleteMember(memberId, name) {
        // let confirm = this.$mdDialog.confirm()
        //     .title('Do you want to delete "' + name + '" from project members?')
        //     .ok('Delete')
        //     .cancel('Cancel');
        //
        // this.$mdDialog.show(confirm).then(() => {
        //     this.ProjectsService
        //         .deleteMember(memberId)
        //         .then(() => {
        //             this.$mdToast.show(
        //                 this.$mdToast.simple().textContent('Success delete!').position('bottom left')
        //             );
        //             this.$rootScope.$emit('updateProjectInfo');
        //         });
        // });
    }

    editMember($event, memberId, roleId, userName) {
        // this.$mdDialog.show(
        //     this.setMdDialogConfig(projectsMemberComponent, $event.target, {
        //         member: {
        //             id: memberId,
        //             roleId: roleId,
        //             name: userName
        //         }
        //         // memberId: memberId,
        //         // roleId: roleId,
        //         // userName: userName
        //     })
        // );
    }

    addMember($event) {
        // this.$mdDialog.show(
        //     this.setMdDialogConfig(projectsMemberComponent, $event.target, {
        //         // identifier: this.model.identifier,
        //         // currentMembers: _.map(this.members, 'user_id')
        //     })
        // );
    }

    openMember(userId) {
        // this.$state.go('users.info', {id: userId});
    }

}