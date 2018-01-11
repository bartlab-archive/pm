import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {$mdToast} $mdToast
 * @property {$auth} $auth
 * @property {$state} $state
 */
export default class MainLoginController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', '$auth', '$state'];
    }

    $onInit() {
        this.errors = {};
        this.loginForm = {};
    }

    submit() {

        this.$auth.login(this.model)
            .then((response) => this.onLogin(response))
            .catch((response) => this.onError(response));
    }

    onLogin(response) {
        if (_.get(response, 'data.token')) {
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent('Welcome!')
            );

            // update user data
            // userService.loadUser(true).then(function () {
            this.$state.go('home');
            // });
        }

        this.errors = _.get(response, 'data.errors', {});
    }

    onError(response) {
        if (_.get(response, 'status') === 500) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Server error')
            );
        } else {
            this.errors = _.get(response, 'data', {});
            for (let field in this.errors) {
                if (this.loginForm.hasOwnProperty(field)) {
                    this.loginForm[field].$setValidity('server', false);
                }
            }
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent('Whoops, your password or email are incorrect')
            );
        }
    }

    change(field) {
        this.loginForm[field].$setValidity('server', true);
        this.errors[field] = undefined;
    }

}