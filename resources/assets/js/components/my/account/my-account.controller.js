import angular from 'angular';
import * as _ from 'lodash';
import ControllerBase from 'base/controller.base';
// import myMailsComponent from '../mails/my-mails.component';
import myEmailsModalTemplate from './my-mails-modal.html';
import myPasswordModalTemplate from './my-password-modal.html';
// import myChangePasswordComponent from '../change-password/my-change-password.component';

/**
 * @property {$auth} $auth
 * @property {$state} $state
 * @property {$mdToast} $mdToast
 * @property {UsersService} UsersService
 * @property {$mdDialog} $mdDialog
 */
export default class mainMyAccountIndexController extends ControllerBase {

    static get $inject() {
        return ['$auth', '$state', '$mdToast', '$mdDialog', 'UsersService'];
    }

    $onInit() {
        this.user = this.UsersService.getUserInfo().then((response) => {
            if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
                this.model = response.data;
                this.model.tokens = this.getTokens(this.model.tokens);
                this.model.email = this.model.email.address;
                this.model.comments_sorting = this.model.preference.others.comments_sorting;
                this.model.no_self_notified = this.model.preference.others.no_self_notified;
                this.model.warn_on_leaving_unsaved = this.model.preference.others.warn_on_leaving_unsaved;
                this.model.time_zone = this.model.preference.time_zone;
                this.model.hide_mail = this.model.preference.hide_mail;
                this.additional_emails = _.map(this.model.additional_emails, function (email) {
                    return _.pick(email, ['id', 'address', 'notify']);
                });
                _.unset(this.model, 'preference');
                _.unset(this.model, 'additional_emails');
            }
        });

        this.languages = this.UsersService.languages;
        this.timeZone = this.UsersService.timeZone;
        this.emailNotifications = this.UsersService.getEmailNotifications;
        this.apiVisibilityState = false;
    }

    getTokens(tokens) {
        const atom = tokens.filter((token) => {
            return token.action === 'feeds';
        });

        const api = tokens.filter((token) => {
            return token.action === 'api';
        });

        return {
            atom: atom[0],
            api: api[0]
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    setMdDialogConfig(template, target) {
        return {
            controller: () => this,
            controllerAs: '$ctrl',
            template: template,
            parent: angular.element(document.body),
            trapFocus: true,
            clickOutsideToClose: true,
            clickEscapeToClose: true,
            escapeToClose: true,
            hasBackdrop: true,
            disableParentScroll: true,
            openFrom: target,
            closeTo: target,
        }
    }

    changePassword($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(myPasswordModalTemplate, $event.target)
        );
    }

    showApiKey() {
        this.apiVisibilityState = !this.apiVisibilityState;
    }

    addEmail($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(myEmailsModalTemplate, $event.target)
        );
    }

    resetApiKey() {
        this.UsersService.resetApiAccessKey().then((response) => {
            if (response && response.status === 200) {
                this.model.tokens.api.updated_on = response.data;
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('API key was reset successfully').position('bottom left')
                );
            }
        });

    }

    resetAtomKey() {
        this.UsersService.resetAtomAccessKey().then((response) => {
            if (response && response.status === 200) {
                this.model.tokens.atom.updated_on = response.data;
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('RSS key was reset successfully').position('bottom left')
                );
            }
        });
    }

    submit() {
        this.model.save().then(
            (response) => {
                if (response && response.status === 200) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent('Account Settings Saved')
                    );
                }
            }
        );
    }

}