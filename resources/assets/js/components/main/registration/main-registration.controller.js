import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

/**
 * @property $auth
 * @property $state
 * @property $mdToast
 * @property UsersService
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
            repeatPassword: '',
            first_name: '',
            last_name: '',
            email: ''
        };
    }

    submit() {
        if (this.signup.password === this.signup.repeatPassword) {
            console.log(this.signup);
            this.$auth.signup(this.signup).then(
                (response) => {
                    console.log(response);
                    if (_.get(response, 'data.token')) {
                        this.signup.auth_key = response.data.token;

                        this.$mdToast.success();

                        // this.$state.go('login');
                    }
                }
            );
        }
    }
}
