/**
 * @property $auth
 * @property $state
 * @property $mdToast
 * @property $mdPanel
 * @property UsersService
 */
import angular from 'angular';
import ControllerBase from 'base/controller.base';
import PasswordTemplate from './change-password/my-account-change-password.html';
import myChangePasswordController from './change-password/my-account-change-password.controller';
import myShowApiKeyTemplate from './show-api-key/my-account-show-api-key.html';
import myShowApiKeyController from './show-api-key/my-account-show-api-key.controller';
import myAccountAddMailController from './add-mail/my-account-add-mail.controller';
import myAccountAddMailTemplate from './add-mail/my-account-add-mail.html';

import * as _ from 'lodash';


export default class mainMyAccountIndexController extends ControllerBase {

    static get $inject() {
        return ['$auth', '$state', '$mdToast', '$mdPanel', 'UsersService'];
    }

    $onInit() {
        this.user = this.UsersService.getUserInfo().then((response) => {
            console.log(response);
            if (response && response.status === 200) {
                // this.model = _.isEmpty(response.data) ? {} : response.data;

                if (!_.isEmpty(response.data)) {
                    this.model = response.data;
                    this.model.hide_mail = !!response.data.hide_mail;
                    this.model.no_self_notified = !!response.data.no_self_notified;
                    this.model.warn_on_leaving_unsaved = !!response.data.warn_on_leaving_unsaved;
                }
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

        let animation = this.$mdPanel.newPanelAnimation();
        animation.duration(300);
        animation.openFrom(target);
        animation.withAnimation(this.$mdPanel.animation.SCALE);

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
    }

    resetAtomKey() {
        this.UsersService.resetAtomAccessKey();
    }

}