import ControllerBase from 'base/controller.base';
import _ from "lodash";

/**
 * @property {$state} $state
 * @property {$mdToast} $mdToast
 * @property {UsersService} usersService
 */
export default class MainRegistrationController extends ControllerBase {

    static get $inject() {
        return ['$state', '$mdToast', 'usersService'];
    }

    $onInit() {
        this.languages = this.usersService.languages;
        this.loadProccess = false;

        this.signup = {
            login: '',
            password: '',
            repeatRassword: '',
            firstName: '',
            lastName: '',
            email: '',
            lang: 'en',
            hideEmail: false
        };

        this.errors = {};
        this.form = {};

        this.settingsService
            .one('self_registration')
            .then((response) => {
                if (_.get(response, 'data.data.value', 0)) {

                }
            });
    }

    submit() {
        this.loadProccess = true;
        this.authService
            .register(this.signup)
            .then((response) => {
                let message = 'Welcome!';
                let state = 'home';

                // todo: look for response and message
                if (!this.authService.isAuthenticated()) {
                    message = 'Your account was created and is now pending administrator approval.';
                    state = 'login';
                }

                this.$mdToast.show(
                    this.$mdToast.simple().textContent(message)
                );

                this.$state.go(state);
            })
            .catch((response) => {
                if (response.status === 422) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent(response.data.message).position('bottom left')
                    );
                }

                this.errors = response.data.errors;
            })
            .finally(() => {
                this.loadProccess = false;
            });
    }

}
