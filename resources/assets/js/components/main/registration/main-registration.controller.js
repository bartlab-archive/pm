import angular from 'angular';
import * as _ from "lodash";

export default class MainRegistrationController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {

        this.$auth = $injector.get('$auth');
        this.$state = $injector.get('$state');
        this.toaster = $injector.get('MaterialToastService');
        this.LangugeService = $injector.get('LanguageService');

        this.languages = this.LangugeService.Language;

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

                        this.toaster.success();

                        // this.$state.go('login');
                    }
                }
            );
        }
    }
}
