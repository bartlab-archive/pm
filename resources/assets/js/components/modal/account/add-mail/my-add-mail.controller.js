import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 */
export default class myAddMailController extends ControllerBase {

    /**
     * @property {$mdDialog} $mdDialog
     * @property {UsersService} UsersService
     * @property {$rootScope} $rootScope
     */
    static get $inject() {
        return ['$mdDialog', 'UsersService', '$rootScope'];
    }

    $onInit() {
        this.emails = _.keyBy(this.additional_emails, 'id');
        this.$rootScope.$on('updateAccountAdditionalEmails', () => this.load());
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
        });
    }
}