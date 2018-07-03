import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {$mdToast} $mdToast
 * @property {MyService} myService
 */
export default class MyChangePasswordController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', 'myService', '$state'];
    }

    $onInit() {
        this.model = {
            password: '',
            new_password: '',
            confirm_new_password: '',
        };
        this.loadProccess = false;
    }

    submit() {
        this.loadProccess = true;
        this.myService
            .changePassword(this.model)
            .then((response) => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Password was successfully updated.')
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
                this.loadProccess = false;
            });
    }

    cancel(){
        this.$state.go('my.account');
    }
}
