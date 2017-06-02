import _ from 'lodash';
/**
 * MainLoginController class
 */
export default class MainLoginController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {
        this.toaster = $injector.get('$mdToast');
        this.$auth = $injector.get('$auth');
        this.$state = $injector.get('$state');
    }


    $onInit() {
    }

    onSubmit() {
        this.$auth.login(this.model)
            .then((response) => this.onLogin(response));
    }

    onLogin(response) {
        // console.log(response);

        if (response.data.token) {
            this.toaster.show(
                this.toaster.simple()
                    .textContent('Welcome!')
            );

            // update user data
            // userService.loadUser(true).then(function () {
            this.$state.go('home');
            // });
        } else {
            this.toaster.show(
                this.toaster.simple()
                    .textContent('Whoops, your password or email are incorrect')
            );
        }
        this.errors = _.get(response, 'data.errors', {});
    }
}