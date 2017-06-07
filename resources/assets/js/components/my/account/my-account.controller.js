import angular from 'angular';
import ControllerBase from 'base/controller.base';
import PasswordTemplate from './change-password/my-account-change-password.html';
import myChangePasswordController from './change-password/my-account-change-password.controller';
import myShowApiKeyTemplate from './show-api-key/my-account-show-api-key.html';
import myShowApiKeyController from './show-api-key/my-account-show-api-key.controller';

/**
 * @property $auth
 * @property $state
 * @property $mdToast
 * @property $mdPanel
 * @property UsersService
 */
export default class mainMyAccountIndexController extends ControllerBase {

  static get $inject() {
    return ['$auth', '$state', '$mdToast', '$mdPanel', 'UsersService'];
  }

  $onInit() {
    this.user = this.UsersService.getUserInfo();
    this.languages = this.UsersService.getLanguage();
    this.timeZone = this.UsersService.getTimeZone();

    this.element = angular.element(document.body);
  }

  setMdPanelConfig(ctrl, tmpl, target) {

    let position = this.$mdPanel.newPanelPosition()
      .absolute()
      .left()
      .top();

    let animation = this.$mdPanel.newPanelAnimation();
    animation.duration(300);
    animation.openFrom(target);
    animation.withAnimation(this.$mdPanel.animation.SCALE);

    this.config = {
      animation: animation,
      attachTo: this.element,
      controller: ctrl,
      controllerAs: '$ctrl',
      template: tmpl,
      panelClass: 'change-password-dialog',
      position: position,
      trapFocus: true,
      clickOutsideToClose: true,
      clickEscapeToClose: true,
      hasBackdrop: true,
    }
  }

  changePassword() {
    this.setMdPanelConfig(myChangePasswordController, PasswordTemplate, '.animation-target');
    this.$mdPanel.open(this.config);
  }

  showApiKey() {
    this.setMdPanelConfig(myShowApiKeyController, myShowApiKeyTemplate, '.show-key');
    this.$mdPanel.open(this.config);
  }

  resetApiKey() {
    this.UsersService.resetApiAccessKey();
  }

  resetAtomKey() {
    this.UsersService.resetAtomAccessKey();
  }

}