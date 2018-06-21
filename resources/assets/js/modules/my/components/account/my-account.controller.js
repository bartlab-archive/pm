import ControllerBase from 'base/controller.base';
import _ from 'lodash';
import moment from "moment";
import angular from 'angular';
// import myEmailsModalTemplate from './my-mails-modal.html';
// import myPasswordModalTemplate from './my-password-modal.html';

/**
 * @property {$auth} $auth
 * @property {$state} $state
 * @property {$mdToast} $mdToast
 * @property {UsersService} UsersService
 * @property {$mdDialog} $mdDialog
 */
export default class MyAccountController extends ControllerBase {

    static get $inject() {
        return ['myService', 'usersService', '$mdToast'];
        // return ['$auth', '$state', '$mdToast', '$mdDialog', 'usersService'];
    }

    $onInit() {
        this.languages = this.usersService.languages;
        this.timeZones = this.usersService.timeZone;
        this.notifications = this.usersService.notifications;

        this.account = {
            preference: {
                time_zone: '',
                hide_mail: true,
                others: {}
            },
            // custom fields for form
            email: '',
            others: {
                comments_sorting: 'asc',
                no_self_notified: true,
                warn_on_leaving_unsaved: true
            }
        };

        this.loadProccess = false;
        this.load();
    }

    load() {
        this.loadProccess = true;
        this.myService
            .account()
            .then((response) => {
                Object.assign(this.account, response.data.data);

                // find tokens
                this.apiToken = this.account.tokens.find((token) => token.action === 'api');
                this.feedToken = this.account.tokens.find((token) => token.action === 'feeds');

                // find email
                const email = this.account.emails.find((email) => email && email.is_default === true);
                this.account.email = email ? email.address : '';

                // get other preference
                this.account.others.comments_sorting = _.get(this.account, 'preference.others.:comments_sorting', 'asc');
                this.account.others.no_self_notified = !!_.get(this.account, 'preference.others.:no_self_notified', true);
                this.account.others.warn_on_leaving_unsaved = !!_.get(this.account, 'preference.others.:warn_on_leaving_unsaved', true);

                // format updated on date from now
                if (this.apiToken) {
                    this.apiToken.updated_on_from_now = moment(this.apiToken.updated_on).fromNow(true);
                }

                // format updated on date from now
                if (this.feedToken) {
                    this.feedToken.updated_on_from_now = moment(this.feedToken.updated_on).fromNow(true);
                }
            })
            .finally(() => {
                this.loadProccess = false;
            });
    }

    submit() {
        this.loadProccess = true;
        this.myService
            .update({
                // core
                firstname: this.account.firstname,
                lastname: this.account.lastname,
                email: this.account.email,
                language: this.account.language,
                mail_notification: this.account.mail_notification,
                // preference
                time_zone: this.account.preference.time_zone,
                hide_mail: this.account.preference.hide_mail,
                // others
                comments_sorting: this.account.others.comments_sorting,
                no_self_notified: this.account.others.no_self_notified,
                warn_on_leaving_unsaved: this.account.others.warn_on_leaving_unsaved,
            })
            .then((response) => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Account was successfully updated.')//.position('bottom left')
                );
            })
            .catch((response) => {
                if (response.status === 422) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent(response.data.message)
                    );
                }

                this.errors = response.data.errors;
            })
            .finally(() => {
                this.loadProccess = false;
            });
    }

    // getTokens(tokens) {
    //     const atom = tokens.filter((token) => {
    //         return token.action === 'feeds';
    //     });
    //
    //     const api = tokens.filter((token) => {
    //         return token.action === 'api';
    //     });
    //
    //     return {
    //         atom: atom[0],
    //         api: api[0]
    //     }
    // }

    // cancel() {
    //     this.$mdDialog.cancel();
    // }
    //
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

    // changePassword($event) {
    //     this.$mdDialog.show(
    //         this.setMdDialogConfig(myPasswordModalTemplate, $event.target)
    //     );
    // }
    //
    // showApiKey() {
    //     this.apiVisibilityState = !this.apiVisibilityState;
    // }
    //
    // showFeedKey() {
    //     this.feedVisibilityState = !this.feedVisibilityState;
    // }

    // addEmail($event) {
    //     this.$mdDialog.show(
    //         this.setMdDialogConfig(myEmailsModalTemplate, $event.target)
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

    // submit() {
    //     this.model.save().then(
    //         (response) => {
    //             if (response && response.status === 200) {
    //                 this.$mdToast.show(
    //                     this.$mdToast.simple().textContent('Account Settings Saved')
    //                 );
    //             }
    //         }
    //     );
    // }

}