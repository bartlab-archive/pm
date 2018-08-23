import ControllerBase from 'base/controller.base';
import _ from 'lodash';
import moment from "moment";
// token
import MyTokenController from "../token/my-token.controller";
import myTokenTemplate from '../token/my-token.html';
// theme
import MyThemeController from "../theme/my-theme.controller";
import myThemeTemplate from '../theme/my-theme.html';

/**
 * @property {$auth} $auth
 * @property {$state} $state
 * @property {$mdToast} $mdToast
 * @property {UsersService} UsersService
 * @property {$mdDialog} $mdDialog
 * @property {ListService} listService
 */
export default class MyAccountController extends ControllerBase {

    static get $inject() {
        return ['myService', 'usersService', '$mdToast', '$mdDialog', 'listService'];
    }

    static setMdDialogConfig(controller, template, target, locals = {}) {
        return {
            controller: controller,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: locals,
            template: template,
            clickOutsideToClose: true,
            openFrom: target,
            closeTo: target,
        };
    }

    $onInit() {
        this.languages = this.listService.languages;
        this.timeZones = this.listService.timeZone;
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

        this.loadProcess = false;
        this.load();
    }

    load() {
        this.loadProcess = true;
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
                this.account.others.comments_sorting = _.get(this.account, 'preference.others.comments_sorting', 'asc') || 'asc';
                this.account.others.no_self_notified = _.get(this.account, 'preference.others.no_self_notified', '1') === '1';
                this.account.others.warn_on_leaving_unsaved = _.get(this.account, 'preference.others.warn_on_leaving_unsaved', '1') === '1';

                // format updated on date from now
                if (this.apiToken) {
                    this.apiToken.updated_on_from_now = moment(this.apiToken.updated_on).fromNow(true);
                }

                // format updated on date from now
                if (this.feedToken) {
                    this.feedToken.updated_on_from_now = moment(this.feedToken.updated_on).fromNow(true);
                }
            })
            .catch((response) => {
                if (response.status === 422) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent(response.data.message)
                    );
                }
            })
            .finally(() => {
                this.loadProcess = false;
            });
    }

    submit() {
        this.loadProcess = true;
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
                this.loadProcess = false;
            });
    }

    showToken(token, title, $event) {
        this.$mdDialog.show(
            this.constructor.setMdDialogConfig(
                MyTokenController,
                myTokenTemplate,
                $event.target,
                {token, title}
            )
        );
    }

    showTheme($event) {
        this.$mdDialog.show(
            this.constructor.setMdDialogConfig(
                MyThemeController,
                myThemeTemplate,
                $event.target,
            )
        );
    }
}