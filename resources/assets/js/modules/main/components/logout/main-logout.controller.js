import ControllerBase from 'base/controller.base';

/**
 * @property {$mdToast} $mdToast
 * @property {AuthService} authService
 * @property {$state} $state
 */
export default class MainLogoutController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', 'authService', '$state'];
    }

    $onInit() {
        this.authService.logout();

        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent('Logout')
        );

        this.$state.go('home');
    }

}