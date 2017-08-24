import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

/**
 * @property {$auth} $auth
 * @property {$state} $state
 * @property {$mdToast} $mdToast
 * @property {UsersService} UsersService
 */
export default class MainRegistrationController extends ControllerBase {

    static get $inject() {
        return ['$auth', '$state', '$mdToast', 'UsersService'];
    }

    $onInit() {
        this.languages = this.UsersService.getLanguage();

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
        this.registrationForm = {};
    }

    submit() {
        if (this.registrationForm.$valid) {
            this.$auth.signup(this.signup)
                .then((response) => this.onRegister(response))
                .catch((response) => this.onError(response));
        }
    }

    onRegister(response) {
        if (_.get(response, 'status') === 201) {
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent('Registration success')
            );
            this.$state.go('login');
        }
    }

    onError(response) {
        if (_.get(response, 'status') === 500) {
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent('Server error')
            );
        } else {
            this.errors = _.get(response, 'data', {});
            for (let field in this.errors) {
                if (this.registrationForm.hasOwnProperty(field)) {
                    this.registrationForm[field].$setValidity('server', false);
                }
            }
        }
    }

    change(field) {
        this.registrationForm[field].$setValidity('server', true);
        this.errors[field] = undefined;
    }
}
