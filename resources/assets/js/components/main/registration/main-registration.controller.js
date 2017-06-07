import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

/**
 * @property $auth
 * @property $state
 * @property $mdToast
 * @property UsersService
 * @property MaterialToastService
 */
export default class MainRegistrationController extends ControllerBase {

    static get $inject() {
        return ['$auth', '$state', '$mdToast', 'UsersService', 'MaterialToastService'];
    }

    $onInit() {
        this.languages = this.UsersService.getLanguage();
        this.mdToast = this.MaterialToastService;

        this.signup = {
            login: '',
            password: '',
            repeat_password: '',
            first_name: '',
            last_name: '',
            email: '',
            lang: ''
        };
    }

    submit() {
        console.log(this.signup);
        if (this.signup.password === this.signup.repeat_password) {
            this.$auth.signup(this.signup).then(
                (response) => {
                    console.log(response);
                    if (response && response.status === 201) {
                        this.mdToast.success();
                        // this.$state.go('login');
                    }
                }
            );
        }
    }
}
