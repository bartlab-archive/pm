import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {UsersService} UsersService
 * @property {$rootScope} $rootScope
 * @property {$mdToast} $mdToast
 */
export default class UsersMailsController extends ControllerBase {

    static get $inject() {
        return ['UsersService', '$rootScope', '$mdToast'];
    }

    $onInit() {
        this.emails = _.keyBy(this.additional_emails, 'id');
        this.addEmailForm = {};
        this.errors = {};
    }

    load() {
        this.UsersService.getAdditionalEmails().then((responce) => {
            this.emails = _.keyBy(responce.data, 'id');
        });

        this.newEmail = null;
    }


    updateEmailAddress(id) {
        this.UsersService.updateAdditionalEmail(id, {notify: this.emails[id].notify}).then(() => {
            this.load();
        });
    }

    deleteEmailAddress(id) {
        this.UsersService.deleteAdditionalEmail(id).then(() => {
            this.load();
        });
    }

    addEmailAddress() {
        this.UsersService.addAdditionalEmail(this.newEmail).then(() => {
            this.load();
        }).catch((response) => this.onError(response));
    }

    onError(response) {
        if (_.get(response, 'status') === 500) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Server error')
            );
        } else {
            this.errors = _.get(response, 'data.errors', {});
            for (let field in this.errors) {
                if (this.addEmailForm.hasOwnProperty(field)) {
                    this.addEmailForm[field].$setValidity('server', false);
                }
            }
        }
    }

    change(field) {
        if (this.addEmailForm.hasOwnProperty(field) && this.errors.hasOwnProperty(field)) {
            this.addEmailForm[field].$setValidity('server', true);
            this.addEmailForm[field] = undefined;
        }
    }

}