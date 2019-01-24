import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {UsersService} usersService
 * @property {$rootScope} $rootScope
 * @property {$mdToast} $mdToast
 */
export default class UsersMailsController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'usersService', '$mdToast', '$state', '$stateParams'];
    }

    $onInit() {
        this.userId = this.$stateParams.id;
        this.email = '';
        this.loadProcess = false;
        this.load();
    }

    load() {
        this.loadProcess = true;
        this.usersService
            .one(this.userId)
            .then((response) => {
                this.emails = response.data.data.emails.filter((email) => !email.is_default);
            })
            .finally(() => {
                this.loadProcess = false;
            });
    }

    submit() {
        this.loadProcess = true;
        this.usersService
            .addEmail(this.email)
            .then((response) => {
                this.emails = response.data.data;
                this.email = '';
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

    notify(item) {
        this.loadProcess = true;
        this.usersService
            .notifyEmail(item.address, item.notify)
            .finally(() => {
                this.loadProcess = false;
            });
    }

    remove(item) {
        let confirm = this.$mdDialog.confirm()
            .title('Are you sure?')
            .ok('Delete!')
            .cancel('Cancel');

        return this.$mdDialog.show(confirm)
            .then(() => {
                this.loadProcess = true;
                return this.usersService.removeEmail(item.address);
            })
            .then(() => this.load())
            .finally(() => {
                this.loadProcess = false;
            });
    }

    cancel() {
        this.$state.go('users.page.edit', {id: this.userId});
    }

}