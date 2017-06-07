import angular from 'angular';
import ControllerBase from 'base/controller.base';
import PasswordTemplate from '../change-password/my-change-password.html';
import myChangePasswordController from '../change-password/my-change-password.controller';
import myShowApiKeyTemplate from './my-show-api-key.html';
import myShowApiKeyController from './my-show-api-key.controller';

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
        this.user = this.UserSevice.getUserInfo();
        this.languages = this.UserSevice.getLanguage();

        this.element = angular.element(document.body);
    }

    changePassword() {
        let position = this.$mdPanel.newPanelPosition()
            .absolute()
            .left()
            .top();

        let animation = this.$mdPanel.newPanelAnimation();
        animation.duration(300);
        animation.openFrom('.animation-target');
        animation.withAnimation(this.$mdPanel.animation.SCALE);

        // todo: move to self component
        let config = {
            animation: animation,
            attachTo: this.element,
            controller: myChangePasswordController,
            controllerAs: '$ctrl',
            template: PasswordTemplate,
            panelClass: 'change-password-dialog',
            position: position,
            trapFocus: true,
            clickOutsideToClose: true,
            clickEscapeToClose: true,
            hasBackdrop: true,
        };

        this.$mdPanel.open(config);
    }

    showApiKey() {
        let position = this._mdPanel.newPanelPosition()
          .absolute()
          .left()
          .top();

        let animation = this._mdPanel.newPanelAnimation();
        animation.duration(300);
        animation.openFrom('.show-key');
        animation.withAnimation(this._mdPanel.animation.SCALE);

        let config = {
          animation: animation,
          attachTo: this.element,
          controller: myShowApiKeyController,
          controllerAs: '$ctrl',
          template: myShowApiKeyTemplate,
          panelClass: 'change-password-dialog',
          position: position,
          trapFocus: true,
          clickOutsideToClose: true,
          clickEscapeToClose: true,
          hasBackdrop: true,
        };

        this._mdPanel.open(config);
    }

}