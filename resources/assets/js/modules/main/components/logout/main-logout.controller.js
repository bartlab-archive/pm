import ControllerBase from 'base/controller.base';

/**
 * @property {$mdToast} $mdToast
 * @property {$auth} $auth
 * @property {$state} $state
 */
export default class MainLogoutController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', '$auth', '$state'];
    }

    $onInit() {
        this.$auth.logout();

        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent('Logout')
        );

        this.$state.go('home');
    }

}