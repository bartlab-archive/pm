import ControllerBase from 'base/controller.base';
import _ from "lodash";

export default class UsersEditController extends ControllerBase {

    static get $inject() {
        return ['$state', '$stateParams', 'usersService', 'listService',
            'USER_STATUS_ACTIVE', 'USER_STATUS_DISABLE', 'USER_STATUS_LOCK'];
    }

    $onInit() {
        this.languages = this.listService.languages;
        this.timeZones = this.listService.timeZone;
        this.notifications = this.usersService.notifications;

        this.user = {
            id: this.$stateParams.id,
            login: '',
            firstname: '',
            lastname: '',
            email: '',
            language: '',
            request: false,
            status: 0,
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

}