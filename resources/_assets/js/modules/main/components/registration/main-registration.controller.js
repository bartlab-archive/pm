import ControllerBase from 'base/controller.base';
import _ from "lodash";

/*
todo: "Minimum password length" get from settings
todo: value for "Hide my email address" get from settings
 */

/**
 * @property {$state} $state
 * @property {$mdToast} $mdToast
 * @property {UsersService} usersService
 * @property {ListService} listService
 * @property {ProjectsService} authService
 */
export default class MainRegistrationController extends ControllerBase {

    static get $inject() {
        return ['$state', '$mdToast', 'usersService', 'settingsService', 'authService', 'listService'];
    }

    $onInit() {
        this.languages = this.listService.languages;
        this.loadProccess = false;

        this.signup = {
            login: '',
            password: '',
            repeat_rassword: '',
            firstname: '',
            lastname: '',
            email: '',
            language: 'en',
            hide_email: false
        };

        this.errors = {};
        this.form = {};

        // check, if registration enabled
        this.settingsService
            .one('self_registration')
            .then((response) => {
                if (_.get(response, 'data.data.value', '0') === '0') {
                    this.$state.go('login');
                }
            });
    }

    login(){
        this.$state.go('login');
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
                    message = response.data.message;
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
                        this.$mdToast.simple().textContent(response.data.message)
                    );
                }

                this.errors = response.data.errors;
            })
            .finally(() => {
                this.loadProccess = false;
            });
    }

}
