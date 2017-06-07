import angular from 'angular';
import ControllerBase from 'base/controller.base';
import PasswordTemplate from '../change-password/my-change-password.html';
import myChangePasswordController from '../change-password/my-change-password.controller';

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

}