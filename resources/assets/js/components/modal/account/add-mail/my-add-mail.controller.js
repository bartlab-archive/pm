import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 */
export default class myAddMailController extends ControllerBase {

    /**
     * @property {$mdDialog} $mdDialog
     * @property {UsersService} UsersService
     * @property {$rootScope} $rootScope
     * @property {$mdToast} $mdToast
     */
    static get $inject() {
        return ['$mdDialog', 'UsersService', '$rootScope', '$mdToast'];
    }

    $onInit() {
        this.emails = _.keyBy(this.additional_emails, 'id');
        this.$rootScope.$on('updateAccountAdditionalEmails', () => this.load());
        this.addEmailForm = {};
        this.errors = {};
    }

    load() {
        this.UsersService.getAdditionalEmails().then((responce) => {
            this.emails = _.keyBy(responce.data, 'id');
        });

        this.newEmail = null;
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    updateEmailAddress(id) {
        this.UsersService.updateAdditionalEmail(id, {notify: this.emails[id].notify}).then(() => {
            this.$rootScope.$emit('updateAccountAdditionalEmails');
        });
    }

    deleteEmailAddress(id) {
        this.UsersService.deleteAdditionalEmail(id).then(() => {
            this.$rootScope.$emit('updateAccountAdditionalEmails');
        });
    }

    addEmailAddress() {
        this.UsersService.addAdditionalEmail(this.newEmail).then(() => {
            this.$rootScope.$emit('updateAccountAdditionalEmails');
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