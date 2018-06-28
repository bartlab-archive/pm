import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {MyService} myService
 */
export default class MyMailsController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'myService','$mdToast'];
    }

    $onInit() {
        this.title = 'Emails';
        this.loadProccess = false;
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
        this.myService
            .notifyEmail(item.address)
            .then(() => {
            });
    }

    remove(item) {
        this.myService
            .removeEmail(item.address)
            .then(() => {
            });
    }
}