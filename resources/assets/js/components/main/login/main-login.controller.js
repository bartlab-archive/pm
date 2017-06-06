import ControllerBase from 'base/controller.base';
import _ from 'lodash';
/**
 * MainLoginController class
 *
 * @property $mdToast
 * @property $auth
 * @property $state
 */
export default class MainLoginController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', '$auth', '$state'];
    }

    onSubmit() {
        this.$auth.login(this.model)
            .then((response) => this.onLogin(response));
    }

    onLogin(response) {
        if (response.data.token) {
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent('Welcome!')
            );

            // update user data
            // userService.loadUser(true).then(function () {
            this.$state.go('home');
            // });
        } else {
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent('Whoops, your password or email are incorrect')
            );
        }

        this.errors = _.get(response, 'data.errors', {});
    }
}