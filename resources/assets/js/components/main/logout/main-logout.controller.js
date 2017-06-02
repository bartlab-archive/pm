export default class MainLogoutController {

    static get $inject() {
        return ['$mdToast', '$auth', '$state'];
    }

    constructor($mdToast, $auth, $state) {
        this.toaster = $mdToast;
        this.$auth = $auth;
        this.$state = $state;
    }

    $onInit() {
        this.$auth.logout();

        this.toaster.show(
            this.toaster.simple()
                .textContent('Logout')
        );

        this.$state.go('home');
    }

}