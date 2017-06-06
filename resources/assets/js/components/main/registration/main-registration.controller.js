import angular from 'angular';

export default class MainRegistrationController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {

        this.$auth = $injector.get('$auth');
        this.$state = $injector.get('$state');
        this.toaster = $injector.get('$mdToast');
        this.UserSevice = $injector.get('UsersService');

        this.languages = this.UserSevice.getLanguage();

        this.init();
    }

    init() {
        angular.extend(this, {
            signup: {
                login: '',
                password: '',
                repeat_passw: '',
                first_name: '',
                last_name: '',
                email: ''
            },
            errors: {
                repeat_passw: false
            }
        });
    }

    submit() {
        if (this.signup.password === this.signup.repeat_passw) {
            if (this.signup.repeat_passw === '' || this.signup.password === '') {
                this.errors = {
                    'repeat_passw': ['Repeat password is empty!'],
                    'password': ['Password is empty!']
                };
            }
            else if (this.signup.repeat_passw.length < 6) {
                this.errors = {
                    'repeat_passw': ['The password must be at least 6 characters.'],
                    'password': ['The password must be at least 6 characters.']
                };
            }
            else {
                this.$auth.signup(this.signup).then(
                    function (response) {
                        if (response.data.result) {
                            this.signup.auth_key = response.data.auth_key;
                            toaster.pop({
                                type: 'success',
                                body: "Confirmation email was sent! Run to your inbox to check it out"
                            });
                            this.signHide = false;
                            $state.go('login');
                        }
                        this.errors = response.data.errors;
                    }
                );
            }
        } else {
            this.errors = {
                repeat_passw: true
            };
        }
    }
}
