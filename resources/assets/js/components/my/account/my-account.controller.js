import angular from 'angular';
import * as _ from 'lodash';
import ControllerBase from 'base/controller.base';
import myShowApiKeyComponent from 'components/modal/account/show-api-key/my-show-api-key.component';
import myAddMailComponent from 'components/modal/account/add-mail/my-add-mail.component';
import myChangePasswordComponent from 'components/modal/account/change-password/my-change-password.component';

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

    setMdDialogConfig(component, target, data = {}) {
        let ctrlConfig = [].concat(
            component.controller.$inject || [],
            [(...args) => {
                let ctrl = new component.controller(...args);

                // decorator
                _.each(data, (v, k) => {
                    ctrl[k] = v;
                });

                ctrl.$onInit && ctrl.$onInit();
                return ctrl;
            }]
        );

        return {
            controller: ctrlConfig,
            controllerAs: '$ctrl',
            template: component.template,
            //panelClass: 'modal-custom-dialog',
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
            this.setMdDialogConfig(myChangePasswordComponent, $event.target)
        );
    }

    showApiKey() {
        if (!this.apiVisibilityState) {
            $('.api-key-container .md-list-item-text #api-key').html(`key: ${this.model.tokens.api.value}`);
            $('.api-key-container #api-key-visibility-icon').html('visibility_off');

        } else {

            $('.api-key-container .md-list-item-text #api-key').html('');
            $('.api-key-container #api-key-visibility-icon').html('visibility');
        }

        this.apiVisibilityState = !this.apiVisibilityState;
    }

    addEmail($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(myAddMailComponent, $event.target, {additional_emails: this.additional_emails})
        );
    }

    resetApiKey() {
        this.UsersService.resetApiAccessKey().then((response) => {
            if (response && response.status === 200) {
                this.model.tokens.api.updated_on = response.data;
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('API key was reset successfully').position('top right')
                );
            }
        });

    }

    resetAtomKey() {
        this.UsersService.resetAtomAccessKey().then((response) => {
            if (response && response.status === 200) {
                this.model.tokens.atom.updated_on = response.data;
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('RSS key was reset successfully').position('top right')
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