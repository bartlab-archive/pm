import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {MyService} myService
 */
export default class MyEmailsController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'myService', '$mdToast'];
    }

    $onInit() {
        this.email = '';
        this.loadProccess = false;
        this.load();
    }

    load() {
        this.loadProccess = true;
        this.myService
            .account()
            .then((response) => {
                this.emails = response.data.data.emails.filter((email) => !email.is_default);
            })
            .finally(() => {
                this.loadProccess = false;
            });
    }

    submit() {
        this.loadProccess = true;
        this.myService
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
                this.loadProccess = false;
            });
    }

    notify(item) {
        this.loadProccess = true;
        this.myService
            .notifyEmail(item.address, item.notify)
            .finally(() => {
                this.loadProccess = false;
            });
    }

    remove(item) {
        let confirm = this.$mdDialog.confirm()
            .title('Are you sure?')
            .ok('Delete!')
            .cancel('Cancel');


        return this.$mdDialog.show(confirm)
            .then(() => {
                this.loadProccess = true;
                return this.myService.removeEmail(item.address);
            })
            .then(() => this.load())
            .finally(() => {
                this.loadProccess = false;
            });
    }
}