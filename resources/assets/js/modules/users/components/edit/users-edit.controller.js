import ControllerBase from 'base/controller.base';
// import usersEditPasswordModalTemplate from './users-edit-password-modal.html';
// import usersEditEmailsModalTemplate from './users-edit-mails-modal.html';

export default class UsersEditController extends ControllerBase {

  static get $inject() {
      return ['usersService', '$stateParams','$state', 'projectsService','$mdToast', '$mdDialog'];
  }

  $onInit() {
      // this.user = this.usersService.one(this.$stateParams.id).then((response) => {
      //
      //     if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
      //         this.model = response.data;
      //         this.model.email = this.model.email.address;
      //
      //         this.model.comments_sorting = this.model.preference.others.comments_sorting;
      //         this.model.no_self_notified = this.model.preference.others.no_self_notified;
      //         this.model.warn_on_leaving_unsaved = this.model.preference.others.warn_on_leaving_unsaved;
      //         this.model.time_zone = this.model.preference.time_zone;
      //         this.model.hide_mail = this.model.preference.hide_mail;
      //         this.additional_emails = _.map(this.model.additional_emails, function (email) {
      //             return _.pick(email, ['id', 'address', 'notify']);
      //         });
      //         _.unset(this.model, 'preference');
      //         _.unset(this.model, 'additional_emails');
      //         console.log( this.model );
      //
      //     }
      // });

      // this.languages = this.usersService.languages;
      // this.timeZone = this.usersService.timeZone;
      // this.emailNotifications = this.usersService.getEmailNotifications;
      // this.apiVisibilityState = false;
  }

  // cancel() {
      // this.$mdDialog.cancel();
  // }

  // setMdDialogConfig(template, target) {
  //     return {
  //         controller: () => this,
  //         controllerAs: '$ctrl',
  //         template: template,
  //         parent: angular.element(document.body),
  //         trapFocus: true,
  //         clickOutsideToClose: true,
  //         clickEscapeToClose: true,
  //         escapeToClose: true,
  //         hasBackdrop: true,
  //         disableParentScroll: true,
  //         openFrom: target,
  //         closeTo: target,
  //     }
  // }
  //
  // changePassword($event) {
  //     this.$mdDialog.show(
  //         this.setMdDialogConfig(usersEditPasswordModalTemplate, $event.target)
  //     );
  // }
  //
  // showApiKey() {
  //     this.apiVisibilityState = !this.apiVisibilityState;
  // }
  //
  // addEmail($event) {
  //     this.$mdDialog.show(
  //         this.setMdDialogConfig(usersEditEmailsModalTemplate, $event.target)
  //     );
  // }
  //
  // resetApiKey() {
  //     this.usersService.resetApiAccessKey().then((response) => {
  //         if (response && response.status === 200) {
  //             this.model.tokens.api.updated_on = response.data.updated_on;
  //             this.model.tokens.api.value = response.data.value;
  //             this.$mdToast.show(
  //                 this.$mdToast.simple().textContent('API key was reset successfully')//.position('bottom left')
  //             );
  //         }
  //     });
  //
  // }
  //
  // resetAtomKey() {
  //     this.usersService.resetAtomAccessKey().then((response) => {
  //         if (response && response.status === 200) {
  //             this.model.tokens.atom.updated_on = response.data.updated_on;
  //             this.$mdToast.show(
  //                 this.$mdToast.simple().textContent('RSS key was reset successfully')//.position('bottom left')
  //             );
  //         }
  //     });
  // }
  //
  // viewUserProfile(userId){
  //      this.$state.go('users.inner.info', {id: userId});
  // }
  // updateUserInfo() {
  //
  //     this.usersService.update(this.model).then(
  //         (response) => {
  //             if (response && response.status === 200) {
  //                 this.$mdToast.show(
  //                     this.$mdToast.simple().textContent('Data updated successfully')
  //                 );
  //             }
  //            // this.$state.go('users.inner.info', {id: this.model.id});
  //         }
  //    );
  // }
}