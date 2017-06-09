import angular from 'angular';
import * as _ from 'lodash';

import ControllerBase from 'base/controller.base';
import PasswordTemplate from './change-password/my-account-change-password.html';
import myChangePasswordController from './change-password/my-account-change-password.controller';
import myShowApiKeyTemplate from './show-api-key/my-account-show-api-key.html';
import myShowApiKeyController from './show-api-key/my-account-show-api-key.controller';
import myAccountAddMailController from './add-mail/my-account-add-mail.controller';
import myAccountAddMailTemplate from './add-mail/my-account-add-mail.html';

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
        this.user = this.UsersService.getUserInfo().then((response) => {
            if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
                this.model = response.data;
            }
        });

        this.languages = this.UsersService.getLanguage();
        this.timeZone = this.UsersService.getTimeZone();

        this.element = angular.element(document.body);
    }

    setMdPanelConfig(ctrl, tmpl, target) {

        let position = this.$mdPanel.newPanelPosition()
            .absolute()
            .center();

        let animation = this.$mdPanel.newPanelAnimation()
            .duration(300)
            .openFrom(target)
            .withAnimation(this.$mdPanel.animation.SCALE);

        return {
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
        this.$mdPanel.open(
            this.setMdPanelConfig(myChangePasswordController, PasswordTemplate, '.animation-target')
        );
    }

    showApiKey() {
        this.$mdPanel.open(
            this.setMdPanelConfig(myShowApiKeyController, myShowApiKeyTemplate, '.show-key')
        );
    }

    addEmail() {
        this.$mdPanel.open(
            this.setMdPanelConfig(myAccountAddMailController, myAccountAddMailTemplate, '.show-add-mail')
        );
    }

    resetApiKey() {
        this.UsersService.resetApiAccessKey();
        this.model.api_key_updated_on = new Date();
    }

    resetAtomKey() {
        this.UsersService.resetAtomAccessKey();
        this.model.atom_key_updated_on = new Date();
    }

    submit() {
        this.model.save();
    }

}