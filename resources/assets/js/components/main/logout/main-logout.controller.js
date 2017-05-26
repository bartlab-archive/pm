export default class MainLogoutController {

    static get $inject() {
        return ['toaster', '$auth', '$state'];
    }

    constructor(toaster, $auth, $state) {
        this.toaster = toaster;
        this.$auth = $auth;
        this.$state = $state;
    }

    $onInit() {
        this.$auth.logout();

        this.toaster.pop({
            type: 'warning',
            body: 'Logout'
        });

        this.$state.go('home');
    }

}