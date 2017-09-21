import angular from 'angular';
import * as _ from 'lodash';
import ControllerBase from 'base/controller.base';
import myShowApiKeyComponent from 'components/my/show-api-key/my-show-api-key.component';
import myAddMailComponent from 'components/modal/account/add-mail/my-add-mail.component';
import myChangePasswordComponent from '../../modal/account/change-password/my-change-password.component';

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

    showApiKey($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(myShowApiKeyComponent, $event.target)
        );
    }

    addEmail($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(myAddMailComponent, $event.target, {additional_emails: this.additional_emails})
        );
    }

    resetApiKey() {
        this.UsersService.resetApiAccessKey().then((response) => {
            this.model.api_key_updated_on = response.data;
        });
    }

    resetAtomKey() {
        this.UsersService.resetAtomAccessKey().then((response) => {
            this.model.atom_key_updated_on = response.data;
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