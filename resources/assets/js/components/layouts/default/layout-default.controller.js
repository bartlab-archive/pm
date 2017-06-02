export default class LayoutDefaultController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {
        this.$mdSidenav = $injector.get('$mdSidenav');
        this.$state = $injector.get('$state');
    }

    $onInit() {
    }

    toggle() {
        this.$mdSidenav('left').toggle();
    }

    openUserMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    logout(){
        this.$state.go('logout');
    }
}