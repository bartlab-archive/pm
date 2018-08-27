import ControllerBase from 'base/controller.base';
import _ from "lodash";

// todo: default languare from system settings
// todo: "Must change password at next logon" option
// todo: "Generate password" option
// todo: "Create and continue" button

export default class UsersEditController extends ControllerBase {

    static get $inject() {
        return ['$state', '$stateParams', 'usersService', 'listService', 'storageService', '$mdToast',
            'USER_STATUS_ACTIVE', 'USER_STATUS_DISABLE', 'USER_STATUS_LOCK'];
    }

    $onInit() {
        this.languages = this.listService.languages;
        this.timeZones = this.listService.timeZone;
        this.notifications = this.usersService.notifications;
        this.me = this.storageService.getUser();

        this.statuses = {
            [this.USER_STATUS_ACTIVE]: 'Active',
            [this.USER_STATUS_DISABLE]: 'Registered',
            [this.USER_STATUS_LOCK]: 'Locked',
        };

        this.user = {
            id: parseInt(this.$stateParams.id),
            login: '',
            firstname: '',
            lastname: '',
            email: '',
            language: 'en',
            request: false,
            status: 0,
            mail_notification: 'only_my_events',
            preference: {
                time_zone: '',
                hide_mail: true,
                others: {}
            },
            // custom fields for form
            others: {
                comments_sorting: 'asc',
                no_self_notified: true,
                warn_on_leaving_unsaved: true
            }
        };

        this.send_information = true;
        this.isSelfEdit = this.me.id === this.user.id;
        this.isNew = !this.$stateParams.id;
        this.loadProcess = false;

        if (!this.isNew) {
            this.load();
        }
    }

    load() {
        this.loadProcess = true;

        this.usersService
            .one(this.user.id)
            .then((response) => {
                Object.assign(this.user, response.data.data);

                // get other preference
                this.user.others.comments_sorting = _.get(this.user, 'preference.others.comments_sorting', 'asc') || 'asc';
                this.user.others.no_self_notified = _.get(this.user, 'preference.others.no_self_notified', '1') === '1';
                this.user.others.warn_on_leaving_unsaved = _.get(this.user, 'preference.others.warn_on_leaving_unsaved', '1') === '1';
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

    cancel() {
        this.$state.go('users.list');
    }

    submit() {
        this.loadProcess = true;
        let model = {
            // core
            login: this.user.login,
            password: this.user.password,
            repeat_rassword: this.user.repeat_rassword,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            language: this.user.language,
            mail_notification: this.user.mail_notification,
            // request: this.user.request,
            // preference
            time_zone: this.user.preference.time_zone,
            hide_mail: this.user.preference.hide_mail,
            // others preference
            comments_sorting: this.user.others.comments_sorting,
            no_self_notified: this.user.others.no_self_notified,
            warn_on_leaving_unsaved: this.user.others.warn_on_leaving_unsaved,
            // system settings
            // send_information: this.send_information,
        };

        if (!this.isSelfEdit) {
            model.send_information = this.send_information;
            model.admin = this.user.request;
        }

        (this.isNew ? this.usersService.create(model) : this.usersService.update(this.user.id, model))
            .then((response) => {
                const user = response.data.data;
                this.$mdToast.show(
                    this.$mdToast.simple().textContent(
                        this.isNew ? 'User ' + user.login + ' created.' : 'Successful update.'
                    )
                );

                this.cancel();
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
}