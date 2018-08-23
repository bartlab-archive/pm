import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {MyService} myService
 * @property {$mdToast} $mdToast
 * @property {$state} $state
 */
export default class MyEmailsController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'myService', '$mdToast','$state'];
    }

    $onInit() {
        this.email = '';
        this.loadProcess = false;
        this.load();
    }

    load() {
        this.loadProcess = true;
        this.myService
            .account()
            .then((response) => {
                this.emails = response.data.data.emails.filter((email) => !email.is_default);
            })
            .finally(() => {
                this.loadProcess = false;
            });
    }

    submit() {
        this.loadProcess = true;
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
                this.loadProcess = false;
            });
    }

    notify(item) {
        this.loadProcess = true;
        this.myService
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
                return this.myService.removeEmail(item.address);
            })
            .then(() => this.load())
            .finally(() => {
                this.loadProcess = false;
            });
    }

    cancel(){
        this.$state.go('my.account');
    }
}